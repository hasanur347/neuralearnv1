'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function CookiesPage() {
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
            Cookie Policy
          </h1>

          <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
            <p className="text-gray-600 mb-4">
              <strong>Last Updated:</strong> December 2024
            </p>

            <p className="text-gray-700 mb-6">
              This Cookie Policy explains how NeuraLearn uses cookies and similar tracking
              technologies to recognize you when you visit our platform. It explains what
              these technologies are, why we use them, and your rights to control them.
            </p>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                What Are Cookies?
              </h2>
              <p className="text-gray-700 mb-4">
                Cookies are small text files that are stored on your device (computer, tablet,
                or mobile) when you visit a website. They help websites remember your preferences
                and improve your browsing experience.
              </p>
              <p className="text-gray-700 mb-4">
                Cookies can be "persistent" (remain on your device until deleted) or "session"
                (deleted when you close your browser).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                Types of Cookies We Use
              </h2>

              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    1. Essential Cookies (Required)
                  </h3>
                  <p className="text-gray-700 mb-2">
                    These cookies are necessary for the platform to function properly.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li><strong>Authentication:</strong> Keep you logged in to your account</li>
                    <li><strong>Security:</strong> Prevent fraudulent activities and CSRF attacks</li>
                    <li><strong>Session Management:</strong> Maintain your session state</li>
                  </ul>
                  <p className="text-gray-600 text-sm mt-2">
                    <em>These cookies cannot be disabled as they are essential for the platform to work.</em>
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    2. Functional Cookies
                  </h3>
                  <p className="text-gray-700 mb-2">
                    These cookies enable enhanced functionality and personalization.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li><strong>Preferences:</strong> Remember your language and display settings</li>
                    <li><strong>Progress Tracking:</strong> Save your quiz progress</li>
                    <li><strong>Customization:</strong> Store your learning preferences</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    3. Analytics Cookies
                  </h3>
                  <p className="text-gray-700 mb-2">
                    These cookies help us understand how you use the platform.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li><strong>Usage Data:</strong> Pages visited, features used, time spent</li>
                    <li><strong>Performance:</strong> Identify errors and loading times</li>
                    <li><strong>User Behavior:</strong> Understand learning patterns</li>
                  </ul>
                  <p className="text-gray-600 text-sm mt-2">
                    <em>This data is anonymized and aggregated.</em>
                  </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    4. Targeting/Advertising Cookies
                  </h3>
                  <p className="text-gray-700 mb-2">
                    We currently <strong>DO NOT</strong> use advertising or targeting cookies.
                  </p>
                  <p className="text-gray-700">
                    If we introduce these in the future, we will update this policy and request
                    your consent.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                Specific Cookies We Use
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">Cookie Name</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Purpose</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Duration</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-sm">next-auth.session-token</td>
                      <td className="border border-gray-300 px-4 py-2">Authentication session</td>
                      <td className="border border-gray-300 px-4 py-2">30 days</td>
                      <td className="border border-gray-300 px-4 py-2">Essential</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-sm">next-auth.csrf-token</td>
                      <td className="border border-gray-300 px-4 py-2">CSRF protection</td>
                      <td className="border border-gray-300 px-4 py-2">Session</td>
                      <td className="border border-gray-300 px-4 py-2">Essential</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-sm">user-preferences</td>
                      <td className="border border-gray-300 px-4 py-2">Store UI preferences</td>
                      <td className="border border-gray-300 px-4 py-2">1 year</td>
                      <td className="border border-gray-300 px-4 py-2">Functional</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2 font-mono text-sm">_ga</td>
                      <td className="border border-gray-300 px-4 py-2">Google Analytics</td>
                      <td className="border border-gray-300 px-4 py-2">2 years</td>
                      <td className="border border-gray-300 px-4 py-2">Analytics</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                Third-Party Cookies
              </h2>
              <p className="text-gray-700 mb-4">
                We may use third-party services that set cookies on our behalf:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Google Analytics:</strong> Website analytics and usage tracking</li>
                <li><strong>Vercel:</strong> Hosting and performance monitoring</li>
                <li><strong>Neon Database:</strong> Data storage (no cookies)</li>
              </ul>
              <p className="text-gray-700 mt-4">
                These third parties have their own privacy policies and cookie policies.
                We recommend reviewing them:
              </p>
              <ul className="list-disc pl-6 text-blue-600 space-y-1 mt-2">
                <li><a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="hover:underline">Google Cookie Policy</a></li>
                <li><a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:underline">Vercel Privacy Policy</a></li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                How to Control Cookies
              </h2>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Browser Settings</h3>
              <p className="text-gray-700 mb-4">
                Most browsers allow you to control cookies through their settings:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Block all cookies:</strong> Prevent all cookies from being set</li>
                <li><strong>Block third-party cookies:</strong> Allow only first-party cookies</li>
                <li><strong>Delete cookies:</strong> Remove existing cookies</li>
                <li><strong>Receive notifications:</strong> Get alerts when cookies are set</li>
              </ul>

              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p className="text-gray-700 font-semibold mb-2">Browser-Specific Instructions:</p>
                <ul className="list-disc pl-6 text-blue-600 space-y-1">
                  <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="hover:underline">Google Chrome</a></li>
                  <li><a href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox" target="_blank" rel="noopener noreferrer" className="hover:underline">Mozilla Firefox</a></li>
                  <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="hover:underline">Safari</a></li>
                  <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="hover:underline">Microsoft Edge</a></li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                <p className="text-gray-700">
                  <strong>⚠️ Important:</strong> Blocking essential cookies will prevent you from
                  logging in and using key features of NeuraLearn.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                Do Not Track (DNT)
              </h2>
              <p className="text-gray-700 mb-4">
                Some browsers have a "Do Not Track" (DNT) feature that signals websites not to
                track your browsing activity. Currently, there is no industry standard for how
                to respond to DNT signals.
              </p>
              <p className="text-gray-700">
                We respect your privacy choices. If your browser sends a DNT signal, we will
                honor it for non-essential analytics cookies.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                Mobile Devices
              </h2>
              <p className="text-gray-700 mb-4">
                On mobile devices, similar technologies are used:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Local Storage:</strong> Store data locally on your device</li>
                <li><strong>Session Storage:</strong> Temporary storage for the browsing session</li>
                <li><strong>Cache:</strong> Store frequently accessed data</li>
              </ul>
              <p className="text-gray-700 mt-4">
                You can clear these through your mobile browser settings or app settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                Changes to This Policy
              </h2>
              <p className="text-gray-700 mb-4">
                We may update this Cookie Policy to reflect changes in our practices or for legal
                reasons. We will notify you of significant changes by email or through a notice
                on the platform.
              </p>
              <p className="text-gray-700">
                Your continued use of NeuraLearn after changes indicates acceptance of the
                updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
                Contact Us
              </h2>
              <p className="text-gray-700 mb-4">
                If you have questions about our use of cookies:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700"><strong>Email:</strong> privacy@neuralearn.com</p>
                <p className="text-gray-700"><strong>Subject:</strong> Cookie Policy Inquiry</p>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Related Policies:{' '}
              <Link href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
              {' '}•{' '}
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
