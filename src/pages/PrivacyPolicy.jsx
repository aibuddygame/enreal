import { seoBase } from '../components/Seo.jsx'

// Simple GPS Faker Logo Component
function GPSFakerLogo() {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
        }}>
            <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #00D4FF 0%, #9D4EDD 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(0, 212, 255, 0.3)',
            }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" fill="none"/>
                    <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="2" fill="none" strokeDasharray="4 4"/>
                    <line x1="12" y1="2" x2="12" y2="5" stroke="white" strokeWidth="2"/>
                    <line x1="12" y1="19" x2="12" y2="22" stroke="white" strokeWidth="2"/>
                    <line x1="2" y1="12" x2="5" y2="12" stroke="white" strokeWidth="2"/>
                    <line x1="19" y1="12" x2="22" y2="12" stroke="white" strokeWidth="2"/>
                </svg>
            </div>
            <div>
                <h1 style={{
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    margin: 0,
                    color: '#fff',
                    letterSpacing: '-0.02em',
                }}>GPS Faker</h1>
                <p style={{
                    fontSize: '0.875rem',
                    color: '#00D4FF',
                    margin: 0,
                    fontWeight: 500,
                }}>Mock Location Utility</p>
            </div>
        </div>
    )
}

export default function PrivacyPolicy() {
    return (
        <div style={{
            minHeight: '100vh',
            background: '#0a0a0a',
            color: '#e5e5e5',
            fontFamily: 'Inter, system-ui, sans-serif',
            lineHeight: 1.7,
        }}>
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                padding: '48px 24px 80px',
            }}>
                <GPSFakerLogo />

                <div style={{
                    background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(157, 78, 221, 0.1) 100%)',
                    border: '1px solid rgba(0, 212, 255, 0.2)',
                    borderRadius: '12px',
                    padding: '24px',
                    marginBottom: '40px',
                }}>
                    <h2 style={{
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        marginBottom: '16px',
                        color: '#fff',
                    }}>Privacy Policy, Terms of Use, and Responsible Use</h2>
                    
                    <div style={{ color: '#a3a3a3', fontSize: '0.9rem' }}>
                        <p style={{ marginBottom: '8px' }}><strong>Effective Date:</strong> April 25, 2026</p>
                        <p style={{ marginBottom: '8px' }}><strong>Last Updated:</strong> April 25, 2026</p>
                        <p style={{ marginBottom: '8px' }}><strong>App Name:</strong> GPS Faker</p>
                        <p style={{ marginBottom: '8px' }}><strong>Operator / Publisher:</strong> VX Real Limited</p>
                        <p style={{ marginBottom: '8px' }}><strong>Website:</strong> <a href="https://enreallab.com.hk/gps-faker/privacy" style={{ color: '#00D4FF' }}>enreallab.com.hk/gps-faker/privacy</a></p>
                        <p><strong>Support Email:</strong> <a href="mailto:developer@vxreal.com" style={{ color: '#00D4FF' }}>developer@vxreal.com</a></p>
                    </div>
                </div>

                <section style={{ marginBottom: '32px' }}>
                    <p style={{ color: '#d4d4d4', marginBottom: '16px' }}>
                        GPS Faker is an Android utility designed for mock-location testing, QA, development, research, and location-behavior validation on devices that you own or are authorized to test.
                    </p>
                    <p style={{ color: '#a3a3a3', marginBottom: '16px' }}>
                        This page explains what GPS Faker does, what information the app handles, how that information is used, the limits of the app, and the rules for using the app responsibly.
                    </p>
                    <p style={{ color: '#a3a3a3' }}>
                        By downloading, installing, or using GPS Faker, you agree to these policies and terms.
                    </p>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '20px', color: '#fff', borderBottom: '2px solid #00D4FF', paddingBottom: '8px' }}>
                        1. Product Purpose
                    </h2>
                    <p style={{ color: '#a3a3a3', marginBottom: '16px' }}>
                        GPS Faker is a technical Android utility that allows users to:
                    </p>
                    <ul style={{ color: '#a3a3a3', paddingLeft: '24px', marginBottom: '20px' }}>
                        <li style={{ marginBottom: '8px' }}>Search for a place or address</li>
                        <li style={{ marginBottom: '8px' }}>Resolve a location into coordinates</li>
                        <li style={{ marginBottom: '8px' }}>Manually enter latitude and longitude</li>
                        <li style={{ marginBottom: '8px' }}>Start and stop mock-location sessions</li>
                        <li style={{ marginBottom: '8px' }}>Save local presets and recent locations on the device</li>
                        <li>Test how apps or workflows behave when mock-location input is active</li>
                    </ul>
                    <p style={{ color: '#fca5a5', marginBottom: '12px', fontWeight: 500 }}>
                        GPS Faker is not a navigation app, ride-hailing app, social location-sharing app, or emergency-use product.
                    </p>
                    <p style={{ color: '#a3a3a3' }}>
                        GPS Faker is intended for technical testing and device-behavior validation only.
                    </p>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '20px', color: '#fff', borderBottom: '2px solid #00D4FF', paddingBottom: '8px' }}>
                        2. Privacy Policy
                    </h2>
                    
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px', color: '#00D4FF' }}>2.1 Overview</h3>
                    <p style={{ color: '#a3a3a3', marginBottom: '16px' }}>
                        This version of GPS Faker is designed to be lightweight and local-first.
                    </p>
                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
                        <p style={{ color: '#86efac', marginBottom: '8px', fontWeight: 500 }}>In this version, the app does NOT:</p>
                        <ul style={{ color: '#a3a3a3', paddingLeft: '24px' }}>
                            <li style={{ marginBottom: '4px' }}>Require login</li>
                            <li style={{ marginBottom: '4px' }}>Require account registration</li>
                            <li style={{ marginBottom: '4px' }}>Include in-app advertising</li>
                            <li style={{ marginBottom: '4px' }}>Include in-app purchases</li>
                            <li>Use a user cloud database for account storage</li>
                        </ul>
                    </div>
                    <p style={{ color: '#a3a3a3', marginBottom: '16px' }}>
                        User presets, history, and settings are stored locally on the device.
                    </p>
                    <p style={{ color: '#fcd34d', marginBottom: '16px' }}>
                        However, this version does include online location search. When the user uses search, the app may send the typed query to an online geocoding or search provider in order to return matching locations and coordinates. Because of that, it would be inaccurate to say that no data ever leaves the device.
                    </p>

                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px', color: '#00D4FF', marginTop: '24px' }}>2.2 Information the app handles</h3>
                    <p style={{ color: '#a3a3a3', marginBottom: '16px' }}>
                        GPS Faker mainly handles the following categories of information:
                    </p>
                    
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '8px', color: '#fff' }}>A. Information stored locally on your device</h4>
                    <ul style={{ color: '#a3a3a3', paddingLeft: '24px', marginBottom: '16px' }}>
                        <li style={{ marginBottom: '4px' }}>Latitude and longitude values you enter</li>
                        <li style={{ marginBottom: '4px' }}>Saved presets</li>
                        <li style={{ marginBottom: '4px' }}>Recent searched or selected locations</li>
                        <li style={{ marginBottom: '4px' }}>Local app settings and preferences</li>
                        <li style={{ marginBottom: '4px' }}>Consent or acknowledgment states shown inside the app</li>
                        <li>Technical state related to ongoing mock-location sessions</li>
                    </ul>

                    <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '8px', color: '#fff' }}>B. Information transmitted for online location search</h4>
                    <p style={{ color: '#a3a3a3', marginBottom: '12px' }}>
                        If you use the location search feature, GPS Faker may transmit the following to an online search or geocoding provider:
                    </p>
                    <ul style={{ color: '#a3a3a3', paddingLeft: '24px', marginBottom: '16px' }}>
                        <li style={{ marginBottom: '4px' }}>The location name, address, region, or keyword you type into search</li>
                        <li>Optionally, other search parameters necessary to return matching places and coordinates</li>
                    </ul>
                    <p style={{ color: '#a3a3a3', marginBottom: '16px' }}>
                        This happens only when you actively use the search function. GPS Faker uses OpenStreetMap Nominatim for online search. If you do not use the search function, this type of request may not occur.
                    </p>

                    <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '8px', color: '#fff' }}>C. Support information</h4>
                    <p style={{ color: '#a3a3a3', marginBottom: '12px' }}>
                        If you contact us directly by email, we may receive the information you choose to include, such as:
                    </p>
                    <ul style={{ color: '#a3a3a3', paddingLeft: '24px' }}>
                        <li style={{ marginBottom: '4px' }}>Your email address</li>
                        <li style={{ marginBottom: '4px' }}>Support details</li>
                        <li style={{ marginBottom: '4px' }}>Screenshots</li>
                        <li style={{ marginBottom: '4px' }}>Bug descriptions</li>
                        <li>Device or Android-version information you voluntarily provide</li>
                    </ul>

                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px', color: '#00D4FF', marginTop: '24px' }}>2.3 What GPS Faker does not do in this version</h3>
                    <p style={{ color: '#a3a3a3', marginBottom: '12px' }}>In this version, GPS Faker does not provide:</p>
                    <ul style={{ color: '#a3a3a3', paddingLeft: '24px', marginBottom: '16px' }}>
                        <li style={{ marginBottom: '4px' }}>Account login</li>
                        <li style={{ marginBottom: '4px' }}>Account registration</li>
                        <li style={{ marginBottom: '4px' }}>Cloud sync for user presets or settings</li>
                        <li style={{ marginBottom: '4px' }}>In-app ads</li>
                        <li style={{ marginBottom: '4px' }}>In-app purchases</li>
                        <li>A custom backend for user profiles</li>
                    </ul>
                    <p style={{ color: '#a3a3a3' }}>The app is intended to operate primarily on-device, except for online location search requests and any support contact initiated by the user.</p>

                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px', color: '#00D4FF', marginTop: '24px' }}>2.4 How information is used</h3>
                    <p style={{ color: '#a3a3a3', marginBottom: '12px' }}>GPS Faker uses information only for app-related functionality reasonably expected by the user.</p>
                    <p style={{ color: '#a3a3a3', marginBottom: '12px' }}>Information may be used to:</p>
                    <ul style={{ color: '#a3a3a3', paddingLeft: '24px', marginBottom: '16px' }}>
                        <li style={{ marginBottom: '4px' }}>Provide location-search results</li>
                        <li style={{ marginBottom: '4px' }}>Resolve place names into coordinates</li>
                        <li style={{ marginBottom: '4px' }}>Support mock-location session workflows</li>
                        <li style={{ marginBottom: '4px' }}>Store presets and recents locally on the device</li>
                        <li style={{ marginBottom: '4px' }}>Remember user settings or acknowledgments</li>
                        <li style={{ marginBottom: '4px' }}>Help the user operate the app correctly</li>
                        <li style={{ marginBottom: '4px' }}>Respond to support requests</li>
                        <li>Maintain and improve reliability, compatibility, and clarity</li>
                    </ul>

                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px', color: '#00D4FF', marginTop: '24px' }}>2.5 Data sharing</h3>
                    <p style={{ color: '#a3a3a3', marginBottom: '16px' }}>We do not sell personal or sensitive user data.</p>
                    <p style={{ color: '#a3a3a3', marginBottom: '12px' }}>However, certain information may still be processed by third parties in limited cases:</p>
                    
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '8px', color: '#fff' }}>A. Online location search provider</h4>
                    <p style={{ color: '#a3a3a3', marginBottom: '12px' }}>When you use location search, your typed search query may be transmitted to OpenStreetMap Nominatim in order to provide search results and coordinates.</p>
                    
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '8px', color: '#fff' }}>B. Support communication</h4>
                    <p style={{ color: '#a3a3a3', marginBottom: '12px' }}>If you email us, your message may be processed through normal email infrastructure providers.</p>
                    
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '8px', color: '#fff' }}>C. Legal or safety reasons</h4>
                    <p style={{ color: '#a3a3a3' }}>We may disclose information if required to do so by law or if reasonably necessary to protect rights, safety, legal compliance, or the integrity of the service.</p>

                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px', color: '#00D4FF', marginTop: '24px' }}>2.6 Data retention</h3>
                    <p style={{ color: '#a3a3a3', marginBottom: '12px' }}>Most app data in this version remains on the user's device.</p>
                    <p style={{ color: '#a3a3a3', marginBottom: '12px' }}>That means:</p>
                    <ul style={{ color: '#a3a3a3', paddingLeft: '24px', marginBottom: '16px' }}>
                        <li style={{ marginBottom: '4px' }}>Local settings remain on the device unless the user deletes the app or clears app storage</li>
                        <li style={{ marginBottom: '4px' }}>Presets and recent locations remain on the device unless removed by the user or deleted through app/data removal</li>
                        <li>There is no account-based cloud retention in this version</li>
                    </ul>
                    <p style={{ color: '#a3a3a3' }}>If you contact us directly by email, we may keep support correspondence for a reasonable period for support, recordkeeping, legal, or operational purposes.</p>

                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px', color: '#00D4FF', marginTop: '24px' }}>2.7 Data security</h3>
                    <p style={{ color: '#a3a3a3', marginBottom: '12px' }}>We use reasonable measures to help protect information under our control.</p>
                    <p style={{ color: '#a3a3a3', marginBottom: '12px' }}>However:</p>
                    <ul style={{ color: '#a3a3a3', paddingLeft: '24px', marginBottom: '16px' }}>
                        <li style={{ marginBottom: '4px' }}>No device</li>
                        <li style={{ marginBottom: '4px' }}>No app</li>
                        <li style={{ marginBottom: '4px' }}>No network transmission</li>
                        <li>And no website</li>
                    </ul>
                    <p style={{ color: '#a3a3a3' }}>Can be guaranteed to be completely secure. If GPS Faker transmits search requests to an online search provider, those requests should be handled securely using standard modern transport security where applicable.</p>

                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px', color: '#00D4FF', marginTop: '24px' }}>2.8 User choices</h3>
                    <p style={{ color: '#a3a3a3', marginBottom: '12px' }}>You may choose to:</p>
                    <ul style={{ color: '#a3a3a3', paddingLeft: '24px', marginBottom: '16px' }}>
                        <li style={{ marginBottom: '4px' }}>Use manual coordinate entry instead of online location search</li>
                        <li style={{ marginBottom: '4px' }}>Clear app data or uninstall the app</li>
                        <li style={{ marginBottom: '4px' }}>Contact us with privacy questions</li>
                        <li>Stop using the app at any time</li>
                    </ul>
                    <p style={{ color: '#a3a3a3' }}>If you do not want typed place queries to be sent to an online search provider, do not use the location search feature.</p>

                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px', color: '#00D4FF', marginTop: '24px' }}>2.9 Children</h3>
                    <p style={{ color: '#a3a3a3' }}>GPS Faker is not designed for children.</p>

                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px', color: '#00D4FF', marginTop: '24px' }}>2.10 Changes to this Privacy Policy</h3>
                    <p style={{ color: '#a3a3a3', marginBottom: '12px' }}>We may update this Privacy Policy from time to time.</p>
                    <p style={{ color: '#a3a3a3' }}>The latest version will be made available at: <a href="https://enreallab.com.hk/gps-faker/privacy" style={{ color: '#00D4FF' }}>enreallab.com.hk/gps-faker/privacy</a></p>

                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px', color: '#00D4FF', marginTop: '24px' }}>2.11 Contact</h3>
                    <p style={{ color: '#a3a3a3' }}>For privacy questions or policy requests, contact:</p>
                    <p style={{ color: '#fff', marginTop: '8px' }}><strong>VX Real Limited</strong><br />
                    <a href="mailto:developer@vxreal.com" style={{ color: '#00D4FF' }}>developer@vxreal.com</a></p>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '20px', color: '#fff', borderBottom: '2px solid #9D4EDD', paddingBottom: '8px' }}>
                        3. Terms of Use
                    </h2>

                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px', color: '#9D4EDD' }}>3.1 Authorized use only</h3>
                    <p style={{ color: '#a3a3a3', marginBottom: '16px' }}>You may use GPS Faker only on:</p>
                    <ul style={{ color: '#a3a3a3', paddingLeft: '24px', marginBottom: '16px' }}>
                        <li style={{ marginBottom: '4px' }}>Devices you own, or</li>
                        <li>Devices you are authorized to test or operate</li>
                    </ul>

                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px', color: '#9D4EDD', marginTop: '24px' }}>3.2 Lawful and responsible use only</h3>
                    <p style={{ color: '#a3a3a3', marginBottom: '12px' }}>You must use GPS Faker lawfully and responsibly.</p>
                    <p style={{ color: '#a3a3a3', marginBottom: '12px' }}>You are responsible for complying with:</p>
                    <ul style={{ color: '#a3a3a3', paddingLeft: '24px', marginBottom: '16px' }}>
                        <li style={{ marginBottom: '4px' }}>Applicable laws and regulations</li>
                        <li style={{ marginBottom: '4px' }}>Android platform rules</li>
                        <li style={{ marginBottom: '4px' }}>Device policies</li>
                        <li style={{ marginBottom: '4px' }}>Workplace or organization policies</li>
                        <li>Third-party app rules and terms of service</li>
                    </ul>

                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px', color: '#9D4EDD', marginTop: '24px' }}>3.3 Prohibited uses</h3>
                    <p style={{ color: '#a3a3a3', marginBottom: '12px' }}>You must not use GPS Faker:</p>
                    <ul style={{ color: '#fca5a5', paddingLeft: '24px', marginBottom: '16px' }}>
                        <li style={{ marginBottom: '4px' }}>For unlawful activity</li>
                        <li style={{ marginBottom: '4px' }}>To infringe the rights or privacy of others</li>
                        <li style={{ marginBottom: '4px' }}>To interfere with safety-critical systems</li>
                        <li style={{ marginBottom: '4px' }}>To misuse services in ways prohibited by law</li>
                        <li style={{ marginBottom: '4px' }}>On devices or systems you are not authorized to test</li>
                        <li>In a way that causes harm, abuse, stalking, fraud, harassment, or unlawful impersonation</li>
                    </ul>

                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px', color: '#9D4EDD', marginTop: '24px' }}>3.4 Availability and updates</h3>
                    <p style={{ color: '#a3a3a3', marginBottom: '16px' }}>We may update, modify, suspend, or discontinue GPS Faker or any part of it at any time. We do not guarantee uninterrupted availability or compatibility.</p>

                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px', color: '#9D4EDD', marginTop: '24px' }}>3.5 No warranty</h3>
                    <p style={{ color: '#a3a3a3', marginBottom: '12px' }}>GPS Faker is provided "as is" and "as available."</p>
                    <p style={{ color: '#a3a3a3', marginBottom: '12px' }}>To the maximum extent permitted by law, we disclaim warranties including:</p>
                    <ul style={{ color: '#a3a3a3', paddingLeft: '24px', marginBottom: '16px' }}>
                        <li style={{ marginBottom: '4px' }}>Merchantability</li>
                        <li style={{ marginBottom: '4px' }}>Fitness for a particular purpose</li>
                        <li style={{ marginBottom: '4px' }}>Non-infringement</li>
                        <li style={{ marginBottom: '4px' }}>Uninterrupted operation</li>
                        <li>Guaranteed compatibility with all devices or apps</li>
                    </ul>

                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px', color: '#9D4EDD', marginTop: '24px' }}>3.6 Limitation of liability</h3>
                    <p style={{ color: '#a3a3a3', marginBottom: '12px' }}>To the maximum extent permitted by law, VX Real Limited is not liable for:</p>
                    <ul style={{ color: '#a3a3a3', paddingLeft: '24px' }}>
                        <li style={{ marginBottom: '4px' }}>Device issues</li>
                        <li style={{ marginBottom: '4px' }}>Third-party app incompatibility</li>
                        <li style={{ marginBottom: '4px' }}>Interrupted sessions</li>
                        <li style={{ marginBottom: '4px' }}>OEM restrictions</li>
                        <li style={{ marginBottom: '4px' }}>Android-version differences</li>
                        <li style={{ marginBottom: '4px' }}>Indirect or consequential damages</li>
                        <li>Losses arising from your use or misuse of GPS Faker</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '20px', color: '#fff', borderBottom: '2px solid #00D4FF', paddingBottom: '8px' }}>
                        4. Mock-Location Disclosure
                    </h2>

                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px', color: '#00D4FF' }}>4.1 Nature of the app</h3>
                    <p style={{ color: '#a3a3a3', marginBottom: '16px' }}>GPS Faker is a mock-location utility. This means the app can simulate or inject test coordinates on supported Android devices when the user has enabled the required Android settings and selected GPS Faker as the device's mock-location app.</p>

                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px', color: '#00D4FF', marginTop: '24px' }}>4.2 No guarantee of third-party app behavior</h3>
                    <p style={{ color: '#a3a3a3', marginBottom: '12px' }}>We do not control how other apps interpret or respond to mock-location input.</p>
                    <p style={{ color: '#a3a3a3', marginBottom: '12px' }}>Different apps may:</p>
                    <ul style={{ color: '#a3a3a3', paddingLeft: '24px', marginBottom: '16px' }}>
                        <li style={{ marginBottom: '4px' }}>Accept mock location</li>
                        <li style={{ marginBottom: '4px' }}>Ignore mock location</li>
                        <li style={{ marginBottom: '4px' }}>Detect mock location</li>
                        <li style={{ marginBottom: '4px' }}>Degrade or restrict functionality</li>
                        <li>Behave inconsistently across updates or devices</li>
                    </ul>

                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px', color: '#00D4FF', marginTop: '24px' }}>4.3 No promise of invisibility or bypass</h3>
                    <p style={{ color: '#a3a3a3', marginBottom: '12px' }}>GPS Faker does not promise:</p>
                    <ul style={{ color: '#fca5a5', paddingLeft: '24px', marginBottom: '16px' }}>
                        <li style={{ marginBottom: '4px' }}>Anonymity</li>
                        <li style={{ marginBottom: '4px' }}>Invisibility</li>
                        <li style={{ marginBottom: '4px' }}>Undetectability</li>
                        <li style={{ marginBottom: '4px' }}>Bypass of third-party controls</li>
                        <li style={{ marginBottom: '4px' }}>Bypass of platform rules</li>
                        <li>Immunity from app, device, account, or legal consequences</li>
                    </ul>
                    <p style={{ color: '#a3a3a3' }}>You are responsible for understanding the rules and consequences of using any third-party service alongside GPS Faker.</p>

                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '12px', color: '#00D4FF', marginTop: '24px' }}>4.4 Compatibility limits</h3>
                    <p style={{ color: '#a3a3a3', marginBottom: '12px' }}>We do not guarantee that GPS Faker will work:</p>
                    <ul style={{ color: '#a3a3a3', paddingLeft: '24px' }}>
                        <li style={{ marginBottom: '4px' }}>On every Android device</li>
                        <li style={{ marginBottom: '4px' }}>On every Android version</li>
                        <li style={{ marginBottom: '4px' }}>On every manufacturer ROM</li>
                        <li style={{ marginBottom: '4px' }}>With every third-party app</li>
                        <li>After every Android or OEM update</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '20px', color: '#fff', borderBottom: '2px solid #9D4EDD', paddingBottom: '8px' }}>
                        5. Responsible Use and Safety Notice
                    </h2>
                    <p style={{ color: '#a3a3a3', marginBottom: '16px' }}>GPS Faker is intended for:</p>
                    <ul style={{ color: '#86efac', paddingLeft: '24px', marginBottom: '20px' }}>
                        <li style={{ marginBottom: '4px' }}>QA</li>
                        <li style={{ marginBottom: '4px' }}>Development</li>
                        <li style={{ marginBottom: '4px' }}>Testing</li>
                        <li style={{ marginBottom: '4px' }}>Research</li>
                        <li>Device-behavior validation</li>
                    </ul>
                    <p style={{ color: '#fca5a5', marginBottom: '16px', fontWeight: 500 }}>Do not use GPS Faker in contexts where inaccurate or simulated location data could create safety, legal, operational, or public-risk issues.</p>
                    <p style={{ color: '#a3a3a3', marginBottom: '12px' }}>Examples include:</p>
                    <ul style={{ color: '#fca5a5', paddingLeft: '24px', marginBottom: '16px' }}>
                        <li style={{ marginBottom: '4px' }}>Emergency services</li>
                        <li style={{ marginBottom: '4px' }}>Medical environments</li>
                        <li style={{ marginBottom: '4px' }}>Public safety systems</li>
                        <li style={{ marginBottom: '4px' }}>Regulated transport</li>
                        <li style={{ marginBottom: '4px' }}>Critical infrastructure</li>
                        <li>Life-critical workflows</li>
                    </ul>
                    <p style={{ color: '#a3a3a3' }}>GPS Faker is not designed, certified, or warranted for these uses.</p>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '20px', color: '#fff', borderBottom: '2px solid #00D4FF', paddingBottom: '8px' }}>
                        6. Website and Policy Notice
                    </h2>
                    <p style={{ color: '#a3a3a3', marginBottom: '12px' }}>If we publish a website for GPS Faker, it may include:</p>
                    <ul style={{ color: '#a3a3a3', paddingLeft: '24px', marginBottom: '16px' }}>
                        <li style={{ marginBottom: '4px' }}>Product descriptions</li>
                        <li style={{ marginBottom: '4px' }}>Screenshots</li>
                        <li style={{ marginBottom: '4px' }}>FAQs</li>
                        <li style={{ marginBottom: '4px' }}>Changelogs</li>
                        <li style={{ marginBottom: '4px' }}>Support information</li>
                        <li>Policy pages</li>
                    </ul>
                    <p style={{ color: '#a3a3a3' }}>Google Play requires the privacy policy URL to be active, publicly accessible, non-geofenced, and non-editable, and the policy should be clearly labeled as a privacy policy.</p>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '20px', color: '#fff', borderBottom: '2px solid #9D4EDD', paddingBottom: '8px' }}>
                        7. Contact and Requests
                    </h2>
                    <p style={{ color: '#a3a3a3', marginBottom: '16px' }}>For support, privacy inquiries, legal notices, or abuse reports, contact:</p>
                    <div style={{
                        background: 'rgba(0, 212, 255, 0.1)',
                        border: '1px solid rgba(0, 212, 255, 0.3)',
                        borderRadius: '8px',
                        padding: '16px',
                    }}>
                        <p style={{ color: '#fff', marginBottom: '8px', fontWeight: 600 }}>VX Real Limited</p>
                        <p style={{ marginBottom: '4px' }}>
                            <a href="mailto:developer@vxreal.com" style={{ color: '#00D4FF' }}>developer@vxreal.com</a>
                        </p>
                    </div>
                </section>

                <footer style={{
                    marginTop: '60px',
                    paddingTop: '24px',
                    borderTop: '1px solid #333',
                    color: '#666',
                    fontSize: '0.875rem',
                    textAlign: 'center',
                }}>
                    <p>© 2026 VX Real Limited. All rights reserved.</p>
                    <p style={{ marginTop: '8px' }}>GPS Faker is a product of VX Real Limited.</p>
                </footer>
            </div>
        </div>
    )
}
