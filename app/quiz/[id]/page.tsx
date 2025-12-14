'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  topic: string
  explanation?: string
}

interface Quiz {
  id: string
  title: string
  description: string
  topic: string
  difficulty: string
  duration: number
  questions: Question[]
}

export default function QuizAttemptPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const quizId = params.id as string

  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [aiFeedback, setAiFeedback] = useState<string>('')
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)
  const quizStartedRef = useRef<boolean>(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (session && session.user.role !== 'STUDENT') {
      alert('Only students can take quizzes')
      router.push('/dashboard')
    }
  }, [status, session, router])

  useEffect(() => {
    if (session && session.user.role === 'STUDENT' && quizId) {
      fetchQuiz()
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [session, quizId])

  useEffect(() => {
    if (quiz && !submitted && !quizStartedRef.current) {
      quizStartedRef.current = true
      const durationInSeconds = quiz.duration * 60
      setTimeLeft(durationInSeconds)
      startTimeRef.current = Date.now()
      
      console.log('Starting timer for', durationInSeconds, 'seconds')
      
      timerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000)
        const remaining = durationInSeconds - elapsed
        
        if (remaining <= 0) {
          console.log('Time up! Auto-submitting...')
          if (timerRef.current) clearInterval(timerRef.current)
          handleSubmit(true)
        } else {
          setTimeLeft(remaining)
        }
      }, 1000)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [quiz, submitted])

  const fetchQuiz = async () => {
    try {
      const response = await fetch(`/api/quiz?id=${quizId}`)
      if (response.ok) {
        const data = await response.json()
        setQuiz(data)
      } else {
        alert('Quiz not found')
        router.push('/quiz')
      }
    } catch (error) {
      console.error('Error fetching quiz:', error)
      alert('Error loading quiz')
      router.push('/quiz')
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }))
  }

  const handleNext = () => {
    if (currentQuestion < quiz!.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const calculateTimeSpent = (): number => {
    return Math.floor((Date.now() - startTimeRef.current) / 1000)
  }

  const handleSubmit = async (autoSubmit = false) => {
    if (submitting) return
    
    if (!autoSubmit && !confirm('Are you sure you want to submit? You cannot change your answers after submission.')) {
      return
    }

    setSubmitting(true)
    
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    const timeSpentSeconds = calculateTimeSpent()
    
    let correctCount = 0
    const weakTopics: string[] = []
    const topicCorrect: Record<string, number> = {}
    const topicTotal: Record<string, number> = {}

    quiz!.questions.forEach((question, idx) => {
      const userAnswer = answers[question.id]
      const isCorrect = userAnswer === question.correctAnswer

      if (isCorrect) {
        correctCount++
      }

      const topic = question.topic
      if (!topicTotal[topic]) {
        topicTotal[topic] = 0
        topicCorrect[topic] = 0
      }
      topicTotal[topic]++
      if (isCorrect) {
        topicCorrect[topic]++
      }
    })

    Object.keys(topicTotal).forEach(topic => {
      const accuracy = (topicCorrect[topic] / topicTotal[topic]) * 100
      if (accuracy < 70) {
        weakTopics.push(topic)
      }
    })

    const score = Math.round((correctCount / quiz!.questions.length) * 100)

    const resultsData = {
      score,
      correctCount,
      totalQuestions: quiz!.questions.length,
      timeSpent: timeSpentSeconds,
      weakAreas: weakTopics,
      answers,
      autoSubmitted: autoSubmit
    }

    setResults(resultsData)
    setAiFeedback(generateAIFeedback(score, weakTopics, timeSpentSeconds))
    setSubmitted(true)
    setSubmitting(false)

    try {
      await fetch('/api/attempt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizId: quiz!.id,
          answers,
          score,
          timeSpent: timeSpentSeconds
        })
      })
    } catch (error) {
      console.error('Error saving attempt:', error)
    }
  }

  const generateAIFeedback = (score: number, weakAreas: string[], timeSpent: number): string => {
    const minutes = Math.floor(timeSpent / 60)
    const seconds = timeSpent % 60
    const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`

    let feedback = `🎯 Quiz Completed!\n\nYou scored ${score}% and spent ${timeString} on this quiz.\n\n`

    if (score >= 90) {
      feedback += "🌟 Excellent work! You've demonstrated strong mastery of the material. "
      feedback += "Consider challenging yourself with harder topics or helping peers who are struggling.\n\n"
    } else if (score >= 70) {
      feedback += "👍 Good job! You have a solid understanding of most concepts. "
      feedback += "Focus on improving weak areas to achieve excellence.\n\n"
    } else if (score >= 50) {
      feedback += "📚 You're on the right track but need more practice. "
      feedback += "Review the concepts and try more problems in your weak areas.\n\n"
    } else {
      feedback += "💪 Don't be discouraged! Learning takes time and practice. "
      feedback += "Start by reviewing the fundamentals and work your way up.\n\n"
    }

    if (weakAreas.length > 0) {
      feedback += `🎯 Areas needing improvement: ${weakAreas.join(', ')}\n\n`
      feedback += "📖 Recommended actions:\n"
      feedback += "• Review course materials for these topics\n"
      feedback += "• Practice more problems in the Resources section\n"
      feedback += "• Use the AI Chatbot to ask specific questions\n"
      feedback += "• Retake this quiz after studying\n"
    } else {
      feedback += "✨ Great! No significant weak areas detected. Keep up the excellent work!"
    }

    return feedback
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">Loading quiz...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user.role !== 'STUDENT' || !quiz) return null

  if (submitted && results) {
    const minutes = Math.floor(results.timeSpent / 60)
    const seconds = results.timeSpent % 60

    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="max-w-3xl mx-auto px-3 sm:px-4">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                <svg className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Quiz {results.autoSubmitted ? 'Time Up!' : 'Completed!'}
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Here are your results for "{quiz.title}"
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 sm:mb-8">
              <div className="bg-blue-50 p-4 sm:p-6 rounded-lg text-center">
                <p className="text-xs sm:text-sm text-blue-600 font-medium mb-1">Score</p>
                <p className="text-3xl sm:text-4xl font-bold text-blue-700">{results.score}%</p>
                <p className="text-xs sm:text-sm text-blue-600 mt-1">
                  {results.correctCount}/{results.totalQuestions} correct
                </p>
              </div>
              <div className="bg-green-50 p-4 sm:p-6 rounded-lg text-center">
                <p className="text-xs sm:text-sm text-green-600 font-medium mb-1">Accuracy</p>
                <p className="text-3xl sm:text-4xl font-bold text-green-700">
                  {Math.round((results.correctCount / results.totalQuestions) * 100)}%
                </p>
              </div>
              <div className="bg-orange-50 p-4 sm:p-6 rounded-lg text-center">
                <p className="text-xs sm:text-sm text-orange-600 font-medium mb-1">Time Spent</p>
                <p className="text-3xl sm:text-4xl font-bold text-orange-700">
                  {minutes}:{seconds.toString().padStart(2, '0')}
                </p>
                <p className="text-xs sm:text-sm text-orange-600 mt-1">minutes</p>
              </div>
            </div>

            {aiFeedback && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl sm:text-3xl">🤖</div>
                  <div className="flex-1">
                    <h2 className="text-base sm:text-lg font-semibold text-purple-900 mb-2">AI Feedback</h2>
                    <p className="text-xs sm:text-sm text-gray-700 whitespace-pre-line leading-relaxed">{aiFeedback}</p>
                  </div>
                </div>
              </div>
            )}

            {results.weakAreas && results.weakAreas.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
                <h2 className="text-base sm:text-lg font-semibold text-yellow-900 mb-3">
                  Areas to Improve
                </h2>
                <div className="flex flex-wrap gap-2">
                  {results.weakAreas.map((area: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-xs sm:text-sm font-medium">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition text-sm sm:text-base"
              >
                Dashboard
              </button>
              <button
                onClick={() => router.push('/quiz')}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-white text-blue-600 font-medium rounded-md border-2 border-blue-600 hover:bg-blue-50 transition text-sm sm:text-base"
              >
                More Quizzes
              </button>
              <button
                onClick={() => router.push('/chatbot')}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition text-sm sm:text-base"
              >
                Ask AI Chatbot
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const question = quiz.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{quiz.title}</h1>
              <div className={`text-base sm:text-lg font-semibold px-3 sm:px-4 py-2 rounded-lg ${
                timeLeft < 60 ? 'bg-red-100 text-red-700 animate-pulse' : 
                timeLeft < 300 ? 'bg-orange-100 text-orange-700' : 
                'bg-green-100 text-green-700'
              }`}>
                ⏱️ {minutes}:{seconds.toString().padStart(2, '0')}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </p>
          </div>

          <div className="mb-6 sm:mb-8">
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
              {question.question}
            </h2>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(question.id, index)}
                  className={`w-full p-3 sm:p-4 text-left rounded-lg border-2 transition text-sm sm:text-base ${
                    answers[question.id] === index
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm sm:text-base"
            >
              Previous
            </button>

            <div className="flex flex-col sm:flex-row gap-3">
              {currentQuestion < quiz.questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition text-sm sm:text-base"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={() => handleSubmit(false)}
                  disabled={submitting}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm sm:text-base"
                >
                  {submitting ? 'Submitting...' : 'Submit Quiz'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
