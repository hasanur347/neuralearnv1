'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function ChatbotPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your AI Learning Assistant. I can help you with:\n\n✅ All CSE topics (Data Structures, Algorithms, Programming, etc.)\n✅ Mathematics, Physics, Chemistry\n✅ Code generation in any programming language\n✅ Debugging and explaining code\n✅ Problem-solving strategies\n✅ Exam preparation tips\n\nAsk me anything! I'm here to help you learn. 🚀",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (session && session.user.role !== 'STUDENT') {
      router.push('/dashboard')
    }
  }, [status, session, router])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const getAIResponse = (question: string): string => {
    const q = question.toLowerCase()

    // Code generation requests
    if (q.includes('write code') || q.includes('generate code') || q.includes('implement') || 
        q.includes('program for') || q.includes('code for') || q.includes('function for')) {
      
      if (q.includes('binary search')) {
        return `Here's a Python implementation of Binary Search:

\`\`\`python
def binary_search(arr, target):
    """
    Binary search algorithm - O(log n) time complexity
    Works only on sorted arrays
    """
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid  # Found the target
        elif arr[mid] < target:
            left = mid + 1  # Search right half
        else:
            right = mid - 1  # Search left half
    
    return -1  # Target not found

# Example usage:
numbers = [1, 3, 5, 7, 9, 11, 13, 15]
result = binary_search(numbers, 7)
print(f"Found at index: {result}")  # Output: Found at index: 3
\`\`\`

**Key Points:**
• Time Complexity: O(log n)
• Space Complexity: O(1)
• Array must be sorted
• Divides search space in half each iteration

Want me to explain how it works step by step?`
      }

      if (q.includes('linked list') || q.includes('linkedlist')) {
        return `Here's a complete Linked List implementation in Python:

\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    
    def insert_at_beginning(self, data):
        """Insert node at the beginning - O(1)"""
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node
    
    def insert_at_end(self, data):
        """Insert node at the end - O(n)"""
        new_node = Node(data)
        
        if self.head is None:
            self.head = new_node
            return
        
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node
    
    def delete_node(self, key):
        """Delete first occurrence of key"""
        current = self.head
        
        # If head contains the key
        if current and current.data == key:
            self.head = current.next
            return
        
        # Search for the key
        prev = None
        while current and current.data != key:
            prev = current
            current = current.next
        
        # Key not found
        if current is None:
            return
        
        # Unlink the node
        prev.next = current.next
    
    def display(self):
        """Print the linked list"""
        current = self.head
        while current:
            print(current.data, end=" -> ")
            current = current.next
        print("None")

# Example usage:
ll = LinkedList()
ll.insert_at_end(1)
ll.insert_at_end(2)
ll.insert_at_end(3)
ll.insert_at_beginning(0)
ll.display()  # Output: 0 -> 1 -> 2 -> 3 -> None
\`\`\`

Want to see more operations like reverse or detect cycle?`
      }

      if (q.includes('sorting') || q.includes('merge sort') || q.includes('quick sort')) {
        return `Here are popular sorting algorithm implementations:

**1. Merge Sort (O(n log n)):**
\`\`\`python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result
\`\`\`

**2. Quick Sort (O(n log n) average):**
\`\`\`python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)

# Usage:
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = quick_sort(numbers)
print(sorted_arr)
\`\`\`

Need more sorting algorithms or explanation?`
      }

      // Generic code generation
      return `I can help you write code! Please specify:

1. **What do you want to implement?** (e.g., sorting algorithm, data structure, specific function)
2. **Programming language?** (Python, Java, C++, JavaScript, etc.)
3. **Any specific requirements?** (time complexity, features, etc.)

**Example requests:**
• "Write code for bubble sort in Python"
• "Implement a stack using arrays in Java"
• "Create a function to reverse a string in C++"
• "Write code for DFS in a graph"

Try asking a specific coding question!`
    }

    // Explain/Debug code
    if (q.includes('explain code') || q.includes('debug') || q.includes('what does this code') || 
        q.includes('error in') || q.includes('fix this code')) {
      return `I can help you understand or debug code!

**To help you effectively, please:**
1. Share the code snippet (paste it in your message)
2. Explain what it's supposed to do
3. Describe the error or issue you're facing

**I can help with:**
• Explaining how code works line by line
• Finding logic errors
• Fixing syntax errors
• Optimizing code performance
• Suggesting best practices

Go ahead and share your code! 💻`
    }

    // Data Structures - Enhanced
    if (q.includes('data structure')) {
      return `**Common Data Structures Overview:**

**Linear:**
1. **Array** - Fixed size, O(1) access
2. **Linked List** - Dynamic, O(1) insertion
3. **Stack** - LIFO principle
4. **Queue** - FIFO principle

**Non-Linear:**
5. **Tree** - Hierarchical structure
6. **Graph** - Nodes with edges
7. **Hash Table** - Key-value pairs, O(1) average

**Which one would you like to learn about?**
• Implementation details?
• Time/space complexity?
• Real-world applications?
• Code examples?

Or ask: "Write code for [data structure]"`
    }

    // Algorithms
    if (q.includes('algorithm')) {
      return `**Algorithm Categories:**

**Sorting:** Bubble, Selection, Insertion, Merge, Quick, Heap
**Searching:** Linear, Binary, DFS, BFS
**Graph:** Dijkstra, Bellman-Ford, Floyd-Warshall, Kruskal, Prim
**Dynamic Programming:** Knapsack, LCS, Matrix Chain
**Greedy:** Activity Selection, Huffman Coding
**Backtracking:** N-Queens, Sudoku, Subset Sum

**Want to:**
• Learn a specific algorithm?
• See code implementation?
• Understand time complexity?
• Practice problems?

Example: "Explain Dijkstra's algorithm" or "Write code for quick sort"`
    }

    // Time Complexity
    if (q.includes('complexity') || q.includes('big o')) {
      return `**Time Complexity Guide (Big O Notation):**

**Common Complexities:**
• **O(1)** - Constant: Array access, hash lookup
• **O(log n)** - Logarithmic: Binary search
• **O(n)** - Linear: Simple loops
• **O(n log n)** - Linearithmic: Merge sort, Quick sort
• **O(n²)** - Quadratic: Nested loops
• **O(2ⁿ)** - Exponential: Recursive Fibonacci
• **O(n!)** - Factorial: Permutations

**Rules:**
1. Drop constants: O(2n) → O(n)
2. Drop non-dominant terms: O(n² + n) → O(n²)
3. Different inputs = different variables

**Example Analysis:**
\`\`\`python
for i in range(n):        # O(n)
    for j in range(n):    # O(n)
        print(i, j)       # O(1)
# Total: O(n²)
\`\`\`

Need help analyzing a specific algorithm?`
    }

    // Programming Languages
    if (q.includes('python') || q.includes('java') || q.includes('c++') || 
        q.includes('javascript') || q.includes('programming language')) {
      return `**Programming Languages - Quick Reference:**

**Python:**
• Easy to learn, great for beginners
• Popular for AI/ML, Data Science
• Dynamic typing, interpreted

**Java:**
• Object-oriented, platform-independent
• Used in Android, Enterprise apps
• Static typing, compiled

**C++:**
• High performance, system programming
• Used in games, OS, embedded systems
• Manual memory management

**JavaScript:**
• Web development (frontend & backend)
• Node.js for server-side
• Dynamic, event-driven

**Which language are you learning?**
I can help with syntax, concepts, or write example code!`
    }

    // OOP
    if (q.includes('oop') || q.includes('object oriented') || q.includes('class') || q.includes('inheritance')) {
      return `**Object-Oriented Programming (OOP):**

**Four Pillars:**

**1. Encapsulation**
• Bundle data and methods together
• Hide internal details
• Use private/public access

**2. Inheritance**
• Create new classes from existing
• Code reuse
• IS-A relationship

**3. Polymorphism**
• Same interface, different implementations
• Method overriding/overloading

**4. Abstraction**
• Hide complex details
• Show only essentials

**Example in Python:**
\`\`\`python
class Animal:  # Parent class
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        pass  # Abstract method

class Dog(Animal):  # Inheritance
    def speak(self):  # Polymorphism
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

# Usage
dog = Dog("Buddy")
print(dog.speak())  # Buddy says Woof!
\`\`\`

Want more OOP concepts or examples?`
    }

    // Databases
    if (q.includes('database') || q.includes('sql') || q.includes('query')) {
      return `**Database & SQL Concepts:**

**SQL Basics:**
\`\`\`sql
-- CREATE
CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    age INT,
    grade VARCHAR(2)
);

-- INSERT
INSERT INTO students VALUES (1, 'John', 20, 'A');

-- SELECT
SELECT * FROM students WHERE age > 18;

-- UPDATE
UPDATE students SET grade = 'A+' WHERE id = 1;

-- DELETE
DELETE FROM students WHERE grade = 'F';
\`\`\`

**Joins:**
• **INNER JOIN** - Matching records from both
• **LEFT JOIN** - All from left + matching from right
• **RIGHT JOIN** - All from right + matching from left
• **FULL JOIN** - All records from both

**Normalization:**
• 1NF: No repeating groups
• 2NF: No partial dependencies
• 3NF: No transitive dependencies

Need help with specific queries or database design?`
    }

    // Math & Science
    if (q.includes('math') || q.includes('calculus') || q.includes('algebra') || 
        q.includes('physics') || q.includes('chemistry')) {
      return `**I can help with various subjects!**

**Mathematics:**
• Algebra, Calculus, Linear Algebra
• Discrete Math, Probability, Statistics
• Problem-solving techniques

**Physics:**
• Mechanics, Thermodynamics
• Electromagnetism, Optics
• Quantum Physics basics

**Chemistry:**
• Organic, Inorganic
• Chemical reactions
• Molecular structures

**What specific topic do you need help with?**
• Explain a concept?
• Solve a problem?
• Understand formulas?

Ask me a specific question like:
"Explain derivatives in calculus"
"What is Newton's second law?"
"How do I balance chemical equations?"`
    }

    // Problem-solving
    if (q.includes('how to solve') || q.includes('approach') || q.includes('strategy')) {
      return `**Problem-Solving Strategy:**

**Step-by-Step Approach:**

1. **Understand the Problem**
   • Read carefully
   • Identify inputs/outputs
   • Look for constraints

2. **Plan Your Solution**
   • Break into smaller parts
   • Choose appropriate data structure
   • Consider edge cases

3. **Implement**
   • Start with brute force
   • Code step by step
   • Test with examples

4. **Optimize**
   • Analyze time/space complexity
   • Look for patterns
   • Apply algorithms

5. **Test & Debug**
   • Test edge cases
   • Check for errors
   • Validate output

**Want help with a specific problem?**
Describe it and I'll guide you through the solution!`
    }

    // Interview prep
    if (q.includes('interview') || q.includes('preparation') || q.includes('job')) {
      return `**Interview Preparation Guide:**

**Technical Skills:**
✅ Data Structures (Array, Linked List, Tree, Graph)
✅ Algorithms (Sorting, Searching, DP)
✅ Time/Space Complexity Analysis
✅ System Design basics
✅ Database & SQL

**Coding Practice:**
• LeetCode Easy → Medium → Hard
• Focus on patterns (Two Pointers, Sliding Window, etc.)
• Practice explaining your thought process
• Time yourself

**Interview Tips:**
1. **Clarify Requirements** - Ask questions!
2. **Think Out Loud** - Explain your approach
3. **Start Simple** - Brute force first
4. **Optimize Gradually** - Improve step by step
5. **Test Your Code** - Check edge cases

**Common Topics:**
• Arrays & Strings
• Linked Lists
• Trees & Graphs
• Dynamic Programming
• System Design

Need practice problems or topic-specific help?`
    }

    // Default - Generic helpful response
    return `I'm here to help you learn! I can assist with:

**Computer Science:**
• Data Structures & Algorithms
• Programming (Python, Java, C++, JavaScript, etc.)
• Database & SQL
• System Design
• Time Complexity Analysis

**Other Subjects:**
• Mathematics (Calculus, Algebra, Statistics)
• Physics
• Chemistry
• Problem-solving strategies

**What I Can Do:**
✅ Explain concepts in simple terms
✅ Write code in any language
✅ Debug and optimize code
✅ Provide practice problems
✅ Help with homework/assignments
✅ Interview preparation

**Try asking:**
• "Explain [concept]"
• "Write code for [problem]"
• "How does [algorithm] work?"
• "Help me solve [problem]"
• "What is [topic]?"

What would you like to learn today? 🚀`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(input),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setLoading(false)
    }, 800)
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading chatbot...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user.role !== 'STUDENT') return null

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 h-[calc(100vh-180px)] flex flex-col">
        <div className="bg-white rounded-t-lg shadow-md p-4 sm:p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl sm:text-2xl">🤖</span>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">AI Learning Assistant</h1>
              <p className="text-xs sm:text-sm text-gray-600">Your 24/7 educational companion</p>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-lg p-3 sm:p-4 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed font-mono">
                  {message.content}
                </div>
                <p className={`text-xs mt-2 ${
                  message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-b-lg shadow-md p-3 sm:p-4 border-t">
          <div className="flex space-x-2 sm:space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything: concepts, code, problems..."
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm sm:text-base font-medium"
            >
              Send
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Try: "Write code for binary search" • "Explain OOP" • "Help with calculus"
          </p>
        </form>
      </div>
    </div>
  )
}
