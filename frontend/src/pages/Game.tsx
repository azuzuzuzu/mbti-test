import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Question {
  id: string
  text: string
  options: { id: string; text: string; scores: Record<string, number> }[]
}

interface Chapter {
  id: number
  title: string
  description: string
  image: string
  questions: Question[]
}

const chapters: Chapter[] = [
  {
    id: 1,
    title: '登基之日',
    description: '你的父王刚刚去世，王国陷入悲痛。今天，你将在众人的注视下加冕为新的国王。',
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80',
    questions: [
      {
        id: '1-1',
        text: '加冕仪式结束后，首席大臣向你汇报：北方边境遭遇入侵，南方发生饥荒，国库空虚。你的第一反应是：',
        options: [
          { id: 'A', text: '立即召集军事会议，制定应对方案', scores: { Te: 3 } },
          { id: 'B', text: '先了解每个问题的具体情况和原因', scores: { Ti: 3 } },
          { id: 'C', text: '感到压力很大，但要保持冷静', scores: { Fi: 2, Si: 1 } },
          { id: 'D', text: '询问百姓的情绪，安抚民心最重要', scores: { Fe: 3 } }
        ]
      },
      {
        id: '1-2',
        text: '你决定先处理哪个问题？',
        options: [
          { id: 'A', text: '边境入侵，国家安全第一', scores: { Te: 2, Se: 1 } },
          { id: 'B', text: '南方饥荒，百姓生计更重要', scores: { Fe: 2, Fi: 1 } },
          { id: 'C', text: '国库问题，没钱什么都做不了', scores: { Ti: 2, Te: 1 } },
          { id: 'D', text: '同时处理，分配不同大臣负责', scores: { Ne: 2, Te: 1 } }
        ]
      },
      {
        id: '1-3',
        text: '军事大臣建议立即出兵反击，财政大臣说国库无力支撑战争。你会：',
        options: [
          { id: 'A', text: '分析双方观点，找出最合理的方案', scores: { Ti: 3 } },
          { id: 'B', text: '先保证国家安全，钱的问题后面解决', scores: { Te: 2, Se: 1 } },
          { id: 'C', text: '考虑战争会给百姓带来什么影响', scores: { Fi: 2, Fe: 1 } },
          { id: 'D', text: '探索其他可能性，比如外交谈判', scores: { Ne: 3 } }
        ]
      },
      {
        id: '1-4',
        text: '晚上，你独自在王座上思考。你在想什么？',
        options: [
          { id: 'A', text: '回顾父王是怎么处理类似问题的', scores: { Si: 3 } },
          { id: 'B', text: '想象王国未来可能的发展方向', scores: { Ni: 2, Ne: 1 } },
          { id: 'C', text: '分析当前局势的各种可能性', scores: { Ne: 2, Ti: 1 } },
          { id: 'D', text: '感受肩上的责任和使命', scores: { Fi: 2, Ni: 1 } }
        ]
      },
      {
        id: '1-5',
        text: '一位老臣私下对你说："陛下，您太年轻了，很多事情应该听我们这些老臣的。"你会：',
        options: [
          { id: 'A', text: '礼貌但坚定地表明自己的立场', scores: { Fi: 2, Te: 1 } },
          { id: 'B', text: '虚心接受建议，但保留决策权', scores: { Fe: 2, Si: 1 } },
          { id: 'C', text: '询问他的具体建议和理由', scores: { Ti: 2, Te: 1 } },
          { id: 'D', text: '感谢他的关心，但要用行动证明自己', scores: { Te: 2, Se: 1 } }
        ]
      }
    ]
  },
  {
    id: 2,
    title: '内政危机',
    description: '三个月过去了。你处理了边境问题，但新的挑战接踵而至。',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80',
    questions: [
      {
        id: '2-1',
        text: '贵族们要求减税，平民们要求贵族多缴税。两派在王宫外争吵。你会：',
        options: [
          { id: 'A', text: '制定一个公平的税收制度，用数据说话', scores: { Ti: 3 } },
          { id: 'B', text: '选择对国家最有利的方案', scores: { Te: 3 } },
          { id: 'C', text: '倾听双方诉求，寻求都能接受的方案', scores: { Fe: 3 } },
          { id: 'D', text: '按照自己的价值观判断谁更有道理', scores: { Fi: 3 } }
        ]
      },
      {
        id: '2-2',
        text: '你的决定引起了一些贵族的不满。有人暗示可能会有"麻烦"。你的反应是：',
        options: [
          { id: 'A', text: '加强警戒，防范可能的威胁', scores: { Si: 2, Te: 1 } },
          { id: 'B', text: '直接面对，召见这些贵族谈话', scores: { Te: 2, Se: 1 } },
          { id: 'C', text: '分析他们的动机和可能的行动', scores: { Ti: 2, Ni: 1 } },
          { id: 'D', text: '感到不安，但相信正义会战胜', scores: { Fi: 2, Ni: 1 } }
        ]
      },
      {
        id: '2-3',
        text: '一位智者来访，说："陛下，治国之道在于......" 他提出了一个全新的理念。你会：',
        options: [
          { id: 'A', text: '仔细思考这个理念的逻辑和可行性', scores: { Ti: 2, Ni: 1 } },
          { id: 'B', text: '评估实施后的效果和成本', scores: { Te: 2, Si: 1 } },
          { id: 'C', text: '想象这个理念可能带来的各种变化', scores: { Ne: 3 } },
          { id: 'D', text: '感受这个理念是否符合自己的信念', scores: { Fi: 2, Ni: 1 } }
        ]
      },
      {
        id: '2-4',
        text: '王后（或王夫）私下对你说："你最近太累了，要注意休息。"你会：',
        options: [
          { id: 'A', text: '感谢关心，但国事更重要', scores: { Te: 2, Fi: 1 } },
          { id: 'B', text: '意识到确实需要平衡工作和生活', scores: { Si: 2, Fe: 1 } },
          { id: 'C', text: '和对方分享自己的压力和想法', scores: { Fe: 2, Fi: 1 } },
          { id: 'D', text: '思考如何更高效地处理政务', scores: { Ti: 2, Te: 1 } }
        ]
      },
      {
        id: '2-5',
        text: '你在处理政务时，更倾向于：',
        options: [
          { id: 'A', text: '参考历史上类似的案例', scores: { Si: 3 } },
          { id: 'B', text: '关注当下最紧迫的问题', scores: { Se: 2, Te: 1 } },
          { id: 'C', text: '思考长远的影响和趋势', scores: { Ni: 3 } },
          { id: 'D', text: '探索创新的解决方案', scores: { Ne: 3 } }
        ]
      }
    ]
  },
  {
    id: 3,
    title: '外交考验',
    description: '邻国派来使者，提出了一个重要的提议。这将决定两国未来的关系。',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    questions: [
      {
        id: '3-1',
        text: '使者提议两国联姻，以巩固和平。但你已经有心仪之人。你会：',
        options: [
          { id: 'A', text: '分析联姻的利弊，做理性决定', scores: { Ti: 2, Te: 1 } },
          { id: 'B', text: '国家利益优先，个人感情次之', scores: { Te: 3 } },
          { id: 'C', text: '不能违背自己的心，寻找其他方案', scores: { Fi: 3 } },
          { id: 'D', text: '询问大臣和百姓的意见', scores: { Fe: 2, Si: 1 } }
        ]
      },
      {
        id: '3-2',
        text: '使者在宴会上表现得很傲慢，似乎在试探你。你会：',
        options: [
          { id: 'A', text: '保持礼貌，观察他的真实意图', scores: { Si: 2, Fe: 1 } },
          { id: 'B', text: '直接而有力地回应，展示国威', scores: { Te: 2, Se: 1 } },
          { id: 'C', text: '分析他话语背后的逻辑和目的', scores: { Ti: 2, Ni: 1 } },
          { id: 'D', text: '用幽默化解紧张，但不失立场', scores: { Ne: 2, Fe: 1 } }
        ]
      },
      {
        id: '3-3',
        text: '使者私下透露：他们国家内部有分歧，有人想要和平，有人想要战争。你会：',
        options: [
          { id: 'A', text: '思考如何利用这个信息', scores: { Te: 2, Ni: 1 } },
          { id: 'B', text: '分析这个信息的真实性', scores: { Ti: 3 } },
          { id: 'C', text: '感到这是个机会，也是个陷阱', scores: { Ni: 2, Fi: 1 } },
          { id: 'D', text: '想象各种可能的发展方向', scores: { Ne: 3 } }
        ]
      },
      {
        id: '3-4',
        text: '在做出最终决定前，你会：',
        options: [
          { id: 'A', text: '召集会议，听取各方意见', scores: { Fe: 2, Te: 1 } },
          { id: 'B', text: '独自思考，相信自己的判断', scores: { Fi: 2, Ni: 1 } },
          { id: 'C', text: '查阅历史，看前人如何处理', scores: { Si: 3 } },
          { id: 'D', text: '分析所有可能的后果', scores: { Ti: 2, Ne: 1 } }
        ]
      },
      {
        id: '3-5',
        text: '使者离开后，你感觉：',
        options: [
          { id: 'A', text: '社交很累，需要独处恢复', scores: { Fi: 2, Si: 1 } },
          { id: 'B', text: '还不错，外交挺有意思的', scores: { Ne: 2, Fe: 1 } },
          { id: 'C', text: '在思考刚才对话的深层含义', scores: { Ni: 2, Ti: 1 } },
          { id: 'D', text: '专注于接下来要做的事', scores: { Te: 2, Se: 1 } }
        ]
      }
    ]
  },
  {
    id: 4,
    title: '王国的未来',
    description: '五年过去了。你的统治让王国发生了巨大变化。现在，你要做出最重要的决定。',
    image: 'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=800&q=80',
    questions: [
      {
        id: '4-1',
        text: '你要为王国选择一个发展方向：',
        options: [
          { id: 'A', text: '建立高效的行政体系，提升国力', scores: { Te: 3 } },
          { id: 'B', text: '完善法律制度，追求公正', scores: { Ti: 2, Te: 1 } },
          { id: 'C', text: '重视百姓福祉，建设和谐社会', scores: { Fe: 3 } },
          { id: 'D', text: '保护个人自由，尊重每个人的选择', scores: { Fi: 3 } }
        ]
      },
      {
        id: '4-2',
        text: '有人建议你改革传统制度，有人坚持保留传统。你倾向于：',
        options: [
          { id: 'A', text: '尊重传统，稳步改进', scores: { Si: 3 } },
          { id: 'B', text: '大胆创新，探索新可能', scores: { Ne: 3 } },
          { id: 'C', text: '看清本质，做必要的改变', scores: { Ni: 3 } },
          { id: 'D', text: '务实行动，解决实际问题', scores: { Se: 2, Te: 1 } }
        ]
      },
      {
        id: '4-3',
        text: '回顾这五年，你最自豪的是：',
        options: [
          { id: 'A', text: '建立了高效的治理体系', scores: { Te: 2, Si: 1 } },
          { id: 'B', text: '解决了复杂的难题', scores: { Ti: 2, Ni: 1 } },
          { id: 'C', text: '让百姓生活得更幸福', scores: { Fe: 2, Fi: 1 } },
          { id: 'D', text: '实现了自己的理想和信念', scores: { Fi: 2, Ni: 1 } }
        ]
      },
      {
        id: '4-4',
        text: '你希望后人如何评价你？',
        options: [
          { id: 'A', text: '一位有远见的君主', scores: { Ni: 2, Te: 1 } },
          { id: 'B', text: '一位务实高效的统治者', scores: { Te: 2, Se: 1 } },
          { id: 'C', text: '一位仁慈爱民的国王', scores: { Fe: 2, Fi: 1 } },
          { id: 'D', text: '一位坚持原则的领袖', scores: { Fi: 2, Ti: 1 } }
        ]
      },
      {
        id: '4-5',
        text: '在这段旅程的最后，你意识到：',
        options: [
          { id: 'A', text: '理解了自己的思维方式', scores: { Ti: 1, Ni: 1, Fi: 1 } },
          { id: 'B', text: '找到了自己的使命', scores: { Ni: 1, Fi: 1, Te: 1 } },
          { id: 'C', text: '看到了更多的可能性', scores: { Ne: 1, Se: 1, Fe: 1 } },
          { id: 'D', text: '成为了更好的自己', scores: { Fi: 1, Fe: 1, Si: 1 } }
        ]
      }
    ]
  }
]

export default function Game() {
  const navigate = useNavigate()
  const [currentChapter, setCurrentChapter] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [scores, setScores] = useState<Record<string, number>>({})

  const chapter = chapters[currentChapter]
  const question = chapter.questions[currentQuestion]

  const handleAnswer = (optionId: string, optionScores: Record<string, number>) => {
    setAnswers({ ...answers, [question.id]: optionId })

    const newScores = { ...scores }
    Object.entries(optionScores).forEach(([func, score]) => {
      newScores[func] = (newScores[func] || 0) + score
    })
    setScores(newScores)

    if (currentQuestion < chapter.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else if (currentChapter < chapters.length - 1) {
      setCurrentChapter(currentChapter + 1)
      setCurrentQuestion(0)
    } else {
      localStorage.setItem('mbti-scores', JSON.stringify(newScores))
      navigate('/result')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="text-sm text-gray-400 mb-2">
            第 {currentChapter + 1} 章 / 共 {chapters.length} 章
          </div>
          <h2 className="text-3xl font-bold mb-4">{chapter.title}</h2>

          {/* 章节图片 */}
          <div className="mb-6 rounded-lg overflow-hidden">
            <img
              src={chapter.image}
              alt={chapter.title}
              className="w-full h-64 object-cover"
            />
          </div>

          <p className="text-gray-300">{chapter.description}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8">
          <p className="text-xl mb-6">{question.text}</p>
          <div className="space-y-4">
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id, option.scores)}
                className="w-full text-left p-4 bg-white/5 hover:bg-white/20 rounded-lg transition border border-white/10"
              >
                <span className="font-bold mr-2">{option.id}.</span>
                {option.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
