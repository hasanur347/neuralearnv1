'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function TermsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 text-sm sm:text-base"
        >
          ← Back to Dashboard
        </Link>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 lg:p-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Terms of Service
          </h1>

          <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
            <p className="text-gray-600 mb-4">
              <strong>Effective Date:</strong> December 2024
            </p>

            <p className="text-gray-700 mb-6">
              Welcome to NeuraLearn! These Terms of Service ("Terms") govern your use of our
              platform. By accessing or using NeuraLearn, you agree to be bound by these Terms.
            </p>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 mb-4">
                By creating an account and using NeuraLearn, you acknowledge that you have read,
                understood, and agree to be bound by these Terms and our Privacy Policy. If you
                do not agree, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                2. Eligibility
              </h2>
              <p className="text-gray-700 mb-4">
                To use NeuraLearn, you must:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Be at least 13 years of age</li>
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Not have been previously banned from the platform</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                3. User Accounts
              </h2>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Account Types</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Student:</strong> Access quizzes, track progress, view resources</li>
                <li><strong>Instructor:</strong> Create quizzes, manage content, view student analytics</li>
                <li><strong>Admin:</strong> Full platform management and oversight</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">Account Responsibilities</h3>
              <p className="text-gray-700 mb-4">You are responsible for:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Maintaining the confidentiality of your password</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized access</li>
                <li>Ensuring your account information is accurate and up-to-date</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                4. Acceptable Use Policy
              </h2>
              <p className="text-gray-700 mb-4">You agree NOT to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Use the platform for any illegal or unauthorized purpose</li>
                <li>Violate any laws in your jurisdiction</li>
                <li>Infringe on intellectual property rights</li>
                <li>Upload malicious code or viruses</li>
                <li>Attempt to gain unauthorized access to systems</li>
                <li>Harass, abuse, or harm other users</li>
                <li>Share your account credentials with others</li>
                <li>Use automated systems to scrape or download content</li>
                <li>Interfere with the proper functioning of the platform</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                5. Content and Intellectual Property
              </h2>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Our Content</h3>
              <p className="text-gray-700 mb-4">
                All content provided by NeuraLearn (quizzes, blogs, resources, design, code)
                is owned by NeuraLearn or its licensors and protected by intellectual property laws.
              </p>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">User-Generated Content</h3>
              <p className="text-gray-700 mb-4">
                When instructors create quizzes or admins create blogs:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>You retain ownership of your content</li>
                <li>You grant us a license to use, display, and distribute it on the platform</li>
                <li>You represent that you have the rights to share this content</li>
                <li>You agree your content does not violate any laws or third-party rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                6. Learning Services
              </h2>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">For Students</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Access to quizzes and educational content</li>
                <li>Personalized learning recommendations</li>
                <li>Progress tracking and analytics</li>
                <li>AI-powered feedback and support</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">For Instructors</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Tools to create and manage quizzes</li>
                <li>Student performance analytics</li>
                <li>Content management capabilities</li>
              </ul>

              <p className="text-gray-700 mt-4">
                We strive to provide high-quality educational content but do not guarantee
                specific learning outcomes or results.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                7. Payment and Refunds
              </h2>
              <p className="text-gray-700 mb-4">
                Currently, NeuraLearn is provided free of charge. If we introduce paid features
                in the future, we will update these Terms and notify users in advance.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                8. Termination
              </h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to suspend or terminate your account if you:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Violate these Terms</li>
                <li>Engage in fraudulent or illegal activities</li>
                <li>Abuse or harass other users</li>
                <li>Use the platform in a harmful manner</li>
              </ul>
              <p className="text-gray-700 mt-4">
                You may terminate your account at any time by contacting us. Upon termination,
                your access to the platform will be revoked.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                9. Disclaimers and Limitations of Liability
              </h2>
              <p className="text-gray-700 mb-4">
                <strong>AS IS BASIS:</strong> NeuraLearn is provided "as is" without warranties
                of any kind, either express or implied.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>NO GUARANTEE:</strong> We do not guarantee that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>The platform will be uninterrupted or error-free</li>
                <li>Defects will be corrected promptly</li>
                <li>The platform is free from viruses or harmful components</li>
                <li>The content is always accurate or complete</li>
              </ul>
              <p className="text-gray-700 mt-4">
                <strong>LIMITATION OF LIABILITY:</strong> To the maximum extent permitted by law,
                NeuraLearn shall not be liable for any indirect, incidental, special, or
                consequential damages arising from your use of the platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                10. Indemnification
              </h2>
              <p className="text-gray-700 mb-4">
                You agree to indemnify and hold harmless NeuraLearn from any claims, damages,
                or expenses (including legal fees) arising from:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Your use of the platform</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any third-party rights</li>
                <li>Content you upload or share</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                11. Changes to Terms
              </h2>
              <p className="text-gray-700 mb-4">
                We may modify these Terms at any time. We will notify you of material changes
                via email or platform notification. Your continued use after changes constitutes
                acceptance of the updated Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                12. Governing Law
              </h2>
              <p className="text-gray-700 mb-4">
                These Terms are governed by the laws of [Your Jurisdiction] without regard to
                conflict of law principles. Any disputes shall be resolved in the courts of
                [Your Jurisdiction].
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                13. Contact Information
              </h2>
              <p className="text-gray-700 mb-4">
                For questions about these Terms:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> legal@neuralearn.com</p>
                <p className="text-gray-700"><strong>Support:</strong> support@neuralearn.com</p>
                <p className="text-gray-700"><strong>Address:</strong> NeuraLearn, Inc.</p>
                <p className="text-gray-700 ml-20">123 Education Street</p>
                <p className="text-gray-700 ml-20">Tech City, TC 12345</p>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              By using NeuraLearn, you agree to these Terms and our{' '}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
