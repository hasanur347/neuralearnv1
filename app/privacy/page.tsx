'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>

          <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
            <p className="text-gray-600 mb-4">
              <strong>Last Updated:</strong> December 2024
            </p>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                1. Information We Collect
              </h2>
              <p className="text-gray-700 mb-4">
                We collect information that you provide directly to us when using NeuraLearn:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Account Information:</strong> Name, email address, password, and role (student/instructor/admin)</li>
                <li><strong>Learning Data:</strong> Quiz attempts, scores, progress, and performance analytics</li>
                <li><strong>Usage Information:</strong> Pages visited, features used, and time spent on the platform</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information, and cookies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-700 mb-4">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide and maintain our educational services</li>
                <li>Personalize your learning experience with adaptive recommendations</li>
                <li>Track your progress and generate performance reports</li>
                <li>Communicate important updates and notifications</li>
                <li>Improve our platform through analytics and user feedback</li>
                <li>Ensure security and prevent fraudulent activities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                3. Data Sharing and Disclosure
              </h2>
              <p className="text-gray-700 mb-4">
                We do not sell your personal information. We may share your data only in these circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>With Instructors:</strong> Your learning progress and quiz results may be visible to instructors</li>
                <li><strong>Service Providers:</strong> Third-party services that help us operate the platform (hosting, analytics)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                4. Data Security
              </h2>
              <p className="text-gray-700 mb-4">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Encrypted data transmission (HTTPS/SSL)</li>
                <li>Secure password storage using bcrypt hashing</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication systems</li>
                <li>Database backups and disaster recovery plans</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                5. Your Rights and Choices
              </h2>
              <p className="text-gray-700 mb-4">
                You have the following rights regarding your personal data:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                <li><strong>Export:</strong> Download your learning data and progress reports</li>
                <li><strong>Opt-out:</strong> Unsubscribe from promotional emails</li>
              </ul>
              <p className="text-gray-700 mt-4">
                To exercise these rights, contact us at{' '}
                <a href="mailto:privacy@neuralearn.com" className="text-blue-600 hover:underline">
                  privacy@neuralearn.com
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                6. Cookies and Tracking
              </h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Keep you logged in to your account</li>
                <li>Remember your preferences and settings</li>
                <li>Analyze platform usage and performance</li>
                <li>Provide personalized content and recommendations</li>
              </ul>
              <p className="text-gray-700 mt-4">
                You can control cookies through your browser settings. See our{' '}
                <Link href="/cookies" className="text-blue-600 hover:underline">
                  Cookie Policy
                </Link>{' '}
                for more details.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                7. Children's Privacy
              </h2>
              <p className="text-gray-700 mb-4">
                NeuraLearn is designed for users aged 13 and above. We do not knowingly collect
                personal information from children under 13. If you believe we have collected
                data from a child under 13, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                8. Data Retention
              </h2>
              <p className="text-gray-700 mb-4">
                We retain your personal data for as long as your account is active or as needed
                to provide services. You can request deletion of your account at any time. Some
                data may be retained for legal or business purposes after account deletion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                9. International Data Transfers
              </h2>
              <p className="text-gray-700 mb-4">
                Your data may be transferred to and processed in countries other than your own.
                We ensure appropriate safeguards are in place to protect your data in accordance
                with this Privacy Policy and applicable laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                10. Changes to This Policy
              </h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of
                significant changes by email or through a notice on the platform. Your continued
                use of NeuraLearn after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                11. Contact Us
              </h2>
              <p className="text-gray-700 mb-4">
                If you have questions about this Privacy Policy or our data practices:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> privacy@neuralearn.com</p>
                <p className="text-gray-700"><strong>Address:</strong> NeuraLearn, Inc.</p>
                <p className="text-gray-700 ml-20">123 Education Street</p>
                <p className="text-gray-700 ml-20">Tech City, TC 12345</p>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              By using NeuraLearn, you agree to this Privacy Policy and our{' '}
              <Link href="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
