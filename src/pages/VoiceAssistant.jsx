import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiOutlineMicrophone,
  HiOutlineSpeakerWave,
  HiOutlineChatBubbleLeftRight,
  HiOutlineLightBulb,
  HiOutlineSparkles,
  HiOutlineUser,
} from 'react-icons/hi2'
import PageWrapper from '@/components/common/PageWrapper.jsx'
import PageHeader from '@/components/common/PageHeader.jsx'
import Badge from '@/components/common/Badge.jsx'
import { classNames } from '@/utils/formatters.js'
import { fadeInUp, staggerContainer, SPRING } from '@/utils/motionVariants.js'

const SUGGESTED_QUESTIONS = [
  'What should I do about low soil moisture?',
  'What is the weather forecast for tomorrow?',
  'Which fertilizer is best for wheat?',
  'When should I harvest my rice crop?',
  'How is my farm health today?',
]

const TRANSCRIPTS = [
  {
    id: 1,
    question: 'What is the current health of my tomato field?',
    answer:
      'Your tomato field (Farm 004) has an NDVI health score of 58/100. Late Blight has been detected affecting approximately 42% of the crop. I recommend immediate treatment with Mancozeb or Chlorothalonil spray. Would you like a detailed action plan?',
    time: '08:12 AM',
  },
  {
    id: 2,
    question: 'Should I irrigate today?',
    answer:
      'Based on current soil moisture readings (62%) and the IMD forecast of 100–120mm rainfall expected in the next 48 hours, I recommend skipping irrigation today. Resume your regular schedule after the rain event.',
    time: '07:45 AM',
  },
  {
    id: 3,
    question: 'What are the best market prices right now?',
    answer:
      'Today\'s top market insights: Turmeric is at a 3-year high at ₹4,200/qtl in Erode mandi — good time to sell stored stock. Alphonso mangoes have an export opportunity in Dubai and Singapore with a 40% premium over domestic prices.',
    time: 'Yesterday',
  },
]

const WAVEFORM_BARS = Array.from({ length: 20 }, (_, i) => i)

function WaveformVisualizer() {
  return (
    <div className="flex items-center justify-center gap-1 h-12">
      {WAVEFORM_BARS.map((i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-primary-400"
          animate={{
            height: ['8px', `${12 + Math.sin(i * 0.8) * 20 + Math.random() * 16}px`, '8px'],
          }}
          transition={{
            duration: 0.6 + Math.random() * 0.4,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: i * 0.04,
          }}
        />
      ))}
    </div>
  )
}


function PulseRings() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="absolute inset-0 rounded-full border-2 border-primary-500/40"
          animate={{ scale: [1, 1.8 + i * 0.3], opacity: [0.6, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeOut',
            delay: i * 0.45,
          }}
        />
      ))}
    </>
  )
}

function TranscriptCard({ item, index }) {
  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      className="glass-card p-4 rounded-2xl flex flex-col gap-3"
    >
      <div className="flex items-start gap-3">
        <span className="shrink-0 size-7 rounded-full bg-surface-2 flex items-center justify-center text-sm text-ink-2">
          <HiOutlineUser />
        </span>
        <div className="flex-1">
          <p className="text-xs font-medium text-ink-3 mb-0.5">You</p>
          <p className="text-sm text-ink font-medium">"{item.question}"</p>
        </div>
        <span className="shrink-0 text-xs text-ink-3">{item.time}</span>
      </div>

      <div className="border-t border-line mx-1" />

      <div className="flex items-start gap-3">
        <span className="shrink-0 size-7 rounded-full bg-primary-500/15 flex items-center justify-center text-sm text-primary-400">
          <HiOutlineSparkles />
        </span>
        <div className="flex-1">
          <p className="text-xs font-medium text-primary-400 mb-0.5">AgriNova AI</p>
          <p className="text-sm text-ink-2 leading-relaxed">{item.answer}</p>
        </div>
      </div>
    </motion.div>
  )
}

function VoiceAssistant() {
  const [listening, setListening] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState(null)

  const toggleListening = () => {
    setListening((prev) => !prev)
    setSelectedQuestion(null)
  }

  const handleSuggestedQuestion = (q) => {
    setSelectedQuestion(q)
    setListening(false)
  }

  return (
    <PageWrapper>
      <PageHeader
        icon={HiOutlineMicrophone}
        accent="violet"
        badge={{ label: 'Coming Soon', status: 'info' }}
        title="AI Voice Assistant"
        description="Talk to your farm's AI. Ask questions, get insights, and receive real-time recommendations — hands-free."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto flex flex-col gap-8"
      >
        <motion.div
          variants={fadeInUp}
          className="glass-card rounded-3xl p-8 sm:p-12 flex flex-col items-center gap-6"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={listening ? 'listening' : 'idle'}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
            >
              <Badge status={listening ? 'active' : 'neutral'}>
                {listening ? 'Listening…' : 'Tap microphone to start'}
              </Badge>
            </motion.div>
          </AnimatePresence>

          <div className="relative flex items-center justify-center">
            {listening && <PulseRings />}

            <motion.button
              onClick={toggleListening}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              transition={SPRING}
              aria-label={listening ? 'Stop listening' : 'Start listening'}
              className={classNames(
                'relative z-10 size-24 rounded-full flex items-center justify-center text-4xl cursor-pointer transition-all duration-300',
                listening
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/40'
                  : 'glass-strong text-ink-2 hover:text-primary-400',
                !listening && 'hover:shadow-lg hover:shadow-primary-500/20',
              )}
            >
              <HiOutlineMicrophone />
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            {listening ? (
              <motion.div
                key="waveform"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full max-w-xs"
              >
                <WaveformVisualizer />
              </motion.div>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-ink-3 text-center max-w-xs"
              >
                Ask anything about your crops, weather, soil, or market prices.
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {selectedQuestion && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="w-full glass rounded-2xl px-5 py-4 text-center"
              >
                <p className="text-xs text-ink-3 mb-1">Selected question</p>
                <p className="text-sm font-medium text-ink">"{selectedQuestion}"</p>
                <p className="text-xs text-ink-3 mt-2 italic">
                  Voice AI is under development — response simulation coming soon.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div variants={fadeInUp} className="glass-card rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="size-8 rounded-lg bg-accent-amber/15 flex items-center justify-center text-amber-400">
              <HiOutlineLightBulb />
            </span>
            <h2 className="font-display font-semibold text-ink">Suggested Questions</h2>
          </div>
          <div className="flex flex-col gap-2">
            {SUGGESTED_QUESTIONS.map((q, i) => (
              <motion.button
                key={q}
                variants={fadeInUp}
                custom={i}
                onClick={() => handleSuggestedQuestion(q)}
                whileHover={{ x: 4 }}
                transition={SPRING}
                className={classNames(
                  'flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer border',
                  selectedQuestion === q
                    ? 'bg-primary-500/15 text-primary-300 border-primary-500/30'
                    : 'glass text-ink-2 hover:text-ink border-transparent hover:border-line hover:glass-card',
                )}
              >
                <span className="shrink-0 size-5 rounded-full bg-primary-500/15 flex items-center justify-center text-primary-400 text-xs font-bold">
                  {i + 1}
                </span>
                {q}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {selectedQuestion && (
            <motion.div
              key="ai-response"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="glass-card rounded-2xl p-5 sm:p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="size-8 rounded-lg bg-primary-500/15 flex items-center justify-center text-primary-400">
                  <HiOutlineSparkles />
                </span>
                <h2 className="font-display font-semibold text-ink">AI Response</h2>
                <Badge status="info">Simulation</Badge>
              </div>
              <div className="glass rounded-xl p-4">
                <p className="text-sm text-ink-2 leading-relaxed">
                  This is a placeholder response for: <span className="font-medium text-ink">"{selectedQuestion}"</span>
                  <br /><br />
                  Once Voice AI is live, AgriNova AI will analyze your farm data in real-time and provide
                  personalized, context-aware recommendations based on your crops, location, soil conditions,
                  and current weather patterns.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div variants={fadeInUp} className="glass-card rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="size-8 rounded-lg bg-accent-sky/15 flex items-center justify-center text-sky-400">
              <HiOutlineChatBubbleLeftRight />
            </span>
            <h2 className="font-display font-semibold text-ink">Recent Transcripts</h2>
            <Badge status="neutral">Example</Badge>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-3"
          >
            {TRANSCRIPTS.map((t, i) => (
              <TranscriptCard key={t.id} item={t} index={i} />
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="flex items-start gap-4 glass rounded-2xl px-5 py-4 border border-accent-amber/20"
        >
          <span className="shrink-0 size-8 rounded-lg bg-accent-amber/15 flex items-center justify-center text-amber-400 mt-0.5">
            <HiOutlineSpeakerWave />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink mb-1">Under Development</p>
            <p className="text-sm text-ink-3 leading-relaxed">
              Voice AI integration is under development. This interface will connect to our AI backend
              to enable real-time, conversational farm intelligence — supporting English, Hindi, Marathi,
              Tamil, and more Indian languages.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </PageWrapper>
  )
}

export default VoiceAssistant
