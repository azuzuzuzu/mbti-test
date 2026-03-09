import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

interface Round {
  speaker: 'user' | 'ai'
  text: string
  options?: { id: string; text: string; scores: Record<string, number> }[]
}

const debates: Record<string, any> = {
  'work-slack': {
    title: '打工人该不该摸鱼？',
    rounds: [
      {
        speaker: 'ai',
        text: '你觉得上班摸鱼有罪吗？老板说"你拿我的工资就要全力以赴"，你怎么看？',
        options: [
          { id: 'A', text: '拿钱办事天经地义，摸鱼就是偷老板的钱', scores: { Te: 3, Si: 1 } },
          { id: 'B', text: '等等，"全力以赴"的定义是什么？工作效率和工作时长是两回事', scores: { Ti: 3, Ne: 1 } },
          { id: 'C', text: '我的时间我做主，只要完成任务就行，凭什么要被监控？', scores: { Fi: 3 } },
          { id: 'D', text: '要看团队氛围吧，如果大家都很拼，我一个人摸鱼确实不太好', scores: { Fe: 3 } }
        ]
      },
      {
        speaker: 'ai',
        text: '有意思。那如果你10分钟就能完成的工作，老板以为要1小时，你会怎么做？',
        options: [
          { id: 'A', text: '10分钟做完然后主动要更多任务，展现价值', scores: { Te: 3 } },
          { id: 'B', text: '研究为什么能这么快完成，看能不能优化流程帮助团队', scores: { Ti: 2, Te: 1 } },
          { id: 'C', text: '做完就摸鱼啊，多出来的时间是我的效率红利', scores: { Fi: 2, Ne: 1 } },
          { id: 'D', text: '看情况，如果同事都很忙我会帮忙，不忙就休息', scores: { Fe: 2, Si: 1 } }
        ]
      },
      {
        speaker: 'ai',
        text: '你的同事天天摸鱼，但工资和你一样，你会怎么想？',
        options: [
          { id: 'A', text: '不公平！要么他降薪要么我涨薪，按劳分配', scores: { Te: 3 } },
          { id: 'B', text: '我会分析他为什么能摸鱼，是工作太简单还是他太聪明？', scores: { Ti: 3 } },
          { id: 'C', text: '羡慕，我也想摸鱼，工作而已没必要太拼', scores: { Se: 2, Fi: 1 } },
          { id: 'D', text: '会有点不爽，但不会说出来，毕竟要维持关系', scores: { Fe: 3 } }
        ]
      },
      {
        speaker: 'ai',
        text: '你发现公司有个漏洞可以多报销，同事都在用，你会怎么做？',
        options: [
          { id: 'A', text: '不用，这是违规的，被发现会有麻烦', scores: { Te: 2, Si: 1 } },
          { id: 'B', text: '分析这个漏洞的风险和公司的监管力度', scores: { Ti: 3 } },
          { id: 'C', text: '不用，这违背我的原则', scores: { Fi: 3 } },
          { id: 'D', text: '不用，但也不会举报同事', scores: { Fe: 2, Fi: 1 } }
        ]
      },
      {
        speaker: 'ai',
        text: '最后一个灵魂拷问：如果可以选择，你更想要哪种工作？',
        options: [
          { id: 'A', text: '高强度高回报，多劳多得', scores: { Te: 2, Se: 1 } },
          { id: 'B', text: '有挑战性的工作，能学到东西', scores: { Ti: 2, Ne: 1 } },
          { id: 'C', text: '做自己喜欢的事，哪怕钱少点', scores: { Fi: 3 } },
          { id: 'D', text: '稳定轻松，能平衡生活', scores: { Si: 2, Fe: 1 } }
        ]
      }
    ]
  },
  'love-brain': {
    title: '恋爱脑是不是一种病？',
    rounds: [
      {
        speaker: 'ai',
        text: '你朋友谈恋爱后整个人都变了，天天围着对象转，你觉得这正常吗？',
        options: [
          { id: 'A', text: '不正常，失去自我太危险了，要保持独立', scores: { Te: 2, Fi: 1 } },
          { id: 'B', text: '要分析具体情况，是真爱还是依赖？程度如何？', scores: { Ti: 3 } },
          { id: 'C', text: '爱情就是这样啊，投入感情有什么错？', scores: { Fi: 2, Fe: 1 } },
          { id: 'D', text: '理解，但会担心ta，希望ta能平衡好', scores: { Fe: 3 } }
        ]
      },
      {
        speaker: 'ai',
        text: '有人说"爱情里没有自我的人，最后都会失去爱情"，你同意吗？',
        options: [
          { id: 'A', text: '完全同意，这是规律，没有价值就会被抛弃', scores: { Te: 3, Ni: 1 } },
          { id: 'B', text: '这个结论太绝对了，需要更多数据支持', scores: { Ti: 3 } },
          { id: 'C', text: '不一定，真爱是相互成就，不是交易', scores: { Fi: 3 } },
          { id: 'D', text: '有道理，但说得太直接了，会伤害恋爱脑的人', scores: { Fe: 2, Fi: 1 } }
        ]
      },
      {
        speaker: 'ai',
        text: '你自己谈恋爱的时候，会是什么样？',
        options: [
          { id: 'A', text: '保持理性，不会让感情影响生活和事业', scores: { Te: 2, Ti: 1 } },
          { id: 'B', text: '会观察和分析对方，确保三观契合', scores: { Ti: 2, Ni: 1 } },
          { id: 'C', text: '享受恋爱的感觉，活在当下每一刻', scores: { Se: 2, Fi: 1 } },
          { id: 'D', text: '会很在意对方的感受，努力维护关系', scores: { Fe: 3 } }
        ]
      },
      {
        speaker: 'ai',
        text: '你觉得恋爱中最重要的是什么？',
        options: [
          { id: 'A', text: '三观一致，目标相同，能一起成长', scores: { Te: 2, Ni: 1 } },
          { id: 'B', text: '思维方式契合，能聊到一起', scores: { Ti: 2, Ne: 1 } },
          { id: 'C', text: '真心相爱，互相理解和尊重', scores: { Fi: 3 } },
          { id: 'D', text: '相处舒服，能照顾彼此的感受', scores: { Fe: 2, Si: 1 } }
        ]
      },
      {
        speaker: 'ai',
        text: '如果恋爱和事业只能选一个，你会怎么选？',
        options: [
          { id: 'A', text: '事业，感情可以再找，事业错过就没了', scores: { Te: 3 } },
          { id: 'B', text: '这个问题本身就有问题，为什么一定要二选一？', scores: { Ti: 2, Ne: 1 } },
          { id: 'C', text: '看我当时更爱哪个，跟着心走', scores: { Fi: 3 } },
          { id: 'D', text: '太难了...可能会选事业但会很愧疚', scores: { Fe: 2, Te: 1 } }
        ]
      }
    ]
  },
  'involution': {
    title: '内卷到底是谁的错？',
    rounds: [
      {
        speaker: 'ai',
        text: '大家都在卷，你不卷就会被淘汰。这是个死循环，你觉得该怪谁？',
        options: [
          { id: 'A', text: '怪制度，资源分配不合理才导致内卷', scores: { Te: 2, Ni: 1 } },
          { id: 'B', text: '先定义什么是内卷，是竞争还是无效竞争？', scores: { Ti: 3 } },
          { id: 'C', text: '怪那些带头卷的人，破坏了平衡', scores: { Fi: 2, Fe: 1 } },
          { id: 'D', text: '不怪谁，大家都是受害者，要互相理解', scores: { Fe: 3 } }
        ]
      },
      {
        speaker: 'ai',
        text: '如果你有能力"躺平"不卷，但你的朋友们都在拼命，你会怎么做？',
        options: [
          { id: 'A', text: '该躺就躺，我的人生我做主', scores: { Fi: 3 } },
          { id: 'B', text: '分析躺平的长期后果，做理性决策', scores: { Ti: 2, Te: 1 } },
          { id: 'C', text: '先享受当下，未来的事未来再说', scores: { Se: 3 } },
          { id: 'D', text: '会有压力，可能还是会跟着卷', scores: { Fe: 2, Si: 1 } }
        ]
      },
      {
        speaker: 'ai',
        text: '有人说"内卷是因为大家都想走捷径，不愿意创新"，你怎么看？',
        options: [
          { id: 'A', text: '有道理，创新才能打破内卷', scores: { Ne: 3 } },
          { id: 'B', text: '太理想化了，创新的风险和成本谁来承担？', scores: { Si: 2, Te: 1 } },
          { id: 'C', text: '创新需要环境支持，不是想创就能创的', scores: { Ti: 2, Ni: 1 } },
          { id: 'D', text: '不能怪个人，是系统性问题', scores: { Fe: 2, Te: 1 } }
        ]
      },
      {
        speaker: 'ai',
        text: '你觉得内卷的根本原因是什么？',
        options: [
          { id: 'A', text: '资源分配不均，蛋糕就这么大', scores: { Te: 2, Ni: 1 } },
          { id: 'B', text: '评价体系单一，大家只能在一条路上挤', scores: { Ti: 3 } },
          { id: 'C', text: '社会焦虑和攀比心理', scores: { Fe: 2, Si: 1 } },
          { id: 'D', text: '缺乏创新和突破的勇气', scores: { Ne: 2, Fi: 1 } }
        ]
      },
      {
        speaker: 'ai',
        text: '最后，如果让你选择一种生活方式：',
        options: [
          { id: 'A', text: '卷到顶端，成为赢家', scores: { Te: 2, Se: 1 } },
          { id: 'B', text: '找到自己的节奏，不被裹挟', scores: { Fi: 2, Ni: 1 } },
          { id: 'C', text: '探索不同的可能性，不局限于一条路', scores: { Ne: 3 } },
          { id: 'D', text: '稳定就好，不求大富大贵', scores: { Si: 3 } }
        ]
      }
    ]
  },
  'plan-vs-spontaneous': {
    title: '计划好的人生有什么意思？',
    rounds: [
      {
        speaker: 'ai',
        text: '朋友突然约你明天去旅行，但你已经安排好了周末的事，你会？',
        options: [
          { id: 'A', text: '去啊！计划赶不上变化，机会难得', scores: { Se: 3 } },
          { id: 'B', text: '看情况，如果我的安排可以改就去', scores: { Ne: 2, Fe: 1 } },
          { id: 'C', text: '不去，我不喜欢打乱计划', scores: { Si: 3 } },
          { id: 'D', text: '要看这个旅行对我长期目标有没有价值', scores: { Ni: 2, Te: 1 } }
        ]
      },
      {
        speaker: 'ai',
        text: '你平时做事喜欢提前规划还是随机应变？',
        options: [
          { id: 'A', text: '提前规划好每一步，心里踏实', scores: { Si: 2, Te: 1 } },
          { id: 'B', text: '有大方向就行，细节看情况调整', scores: { Ni: 2, Ne: 1 } },
          { id: 'C', text: '不喜欢计划，走一步看一步更自由', scores: { Se: 3 } },
          { id: 'D', text: '会列计划但经常不按计划来', scores: { Ne: 2, Se: 1 } }
        ]
      },
      {
        speaker: 'ai',
        text: '如果让你选一种旅行方式：',
        options: [
          { id: 'A', text: '详细攻略，每天去哪都安排好', scores: { Si: 3 } },
          { id: 'B', text: '定好目标景点，其他随意', scores: { Te: 2, Se: 1 } },
          { id: 'C', text: '完全不做攻略，到了再说', scores: { Se: 3 } },
          { id: 'D', text: '了解当地文化，但保持开放探索', scores: { Ne: 2, Ni: 1 } }
        ]
      },
      {
        speaker: 'ai',
        text: '你更享受哪种状态？',
        options: [
          { id: 'A', text: '一切尽在掌控，按部就班', scores: { Si: 2, Te: 1 } },
          { id: 'B', text: '充满变化和刺激，每天都不一样', scores: { Se: 3 } },
          { id: 'C', text: '有明确目标，朝着方向前进', scores: { Ni: 2, Te: 1 } },
          { id: 'D', text: '充满可能性，可以自由探索', scores: { Ne: 3 } }
        ]
      },
      {
        speaker: 'ai',
        text: '周末突然有空闲时间，你会？',
        options: [
          { id: 'A', text: '按原计划做该做的事', scores: { Si: 2, Te: 1 } },
          { id: 'B', text: '想做什么就做什么，享受当下', scores: { Se: 3 } },
          { id: 'C', text: '思考一下怎么利用这个时间最有意义', scores: { Ni: 2, Ti: 1 } },
          { id: 'D', text: '试试一直想尝试的新东西', scores: { Ne: 2, Se: 1 } }
        ]
      }
    ]
  },
  'social-media': {
    title: '社交媒体让人更孤独了吗？',
    rounds: [
      {
        speaker: 'ai',
        text: '你有3000个好友，但半夜难过时一个能打电话的都没有。这算社交吗？',
        options: [
          { id: 'A', text: '不算，真正的社交是深度连接，不是数字游戏', scores: { Fi: 3 } },
          { id: 'B', text: '这是社交方式的演变，不能用旧标准衡量', scores: { Ne: 2, Ti: 1 } },
          { id: 'C', text: '是个人问题，不会经营关系怪不了社交媒体', scores: { Te: 2, Ti: 1 } },
          { id: 'D', text: '确实，线上社交缺少温度', scores: { Fe: 2, Si: 1 } }
        ]
      },
      {
        speaker: 'ai',
        text: '刷到别人的精彩生活，你会觉得自己很失败吗？',
        options: [
          { id: 'A', text: '会，然后更努力让自己变得更好', scores: { Te: 2, Se: 1 } },
          { id: 'B', text: '会分析这是不是真实的，还是只是展示面', scores: { Ti: 3 } },
          { id: 'C', text: '不会，每个人的人生不一样，没必要比较', scores: { Fi: 2, Ni: 1 } },
          { id: 'D', text: '有时会，但会提醒自己不要陷入焦虑', scores: { Fe: 2, Si: 1 } }
        ]
      },
      {
        speaker: 'ai',
        text: '如果让你一个月不用社交媒体，你觉得会怎样？',
        options: [
          { id: 'A', text: '无所谓，本来也不怎么用', scores: { Fi: 2, Ti: 1 } },
          { id: 'B', text: '会错过很多信息和机会，不太行', scores: { Te: 2, Ne: 1 } },
          { id: 'C', text: '可能会更焦虑，怕被孤立', scores: { Fe: 3 } },
          { id: 'D', text: '想试试，说不定会有新发现', scores: { Ne: 2, Se: 1 } }
        ]
      },
      {
        speaker: 'ai',
        text: '你平时发朋友圈吗？发什么内容？',
        options: [
          { id: 'A', text: '很少发，觉得没必要展示生活', scores: { Fi: 2, Ti: 1 } },
          { id: 'B', text: '会发，但会精心挑选内容和时机', scores: { Te: 2, Ni: 1 } },
          { id: 'C', text: '想发就发，记录生活瞬间', scores: { Se: 2, Fe: 1 } },
          { id: 'D', text: '经常发，喜欢和大家分享', scores: { Fe: 2, Ne: 1 } }
        ]
      },
      {
        speaker: 'ai',
        text: '你更喜欢哪种社交方式？',
        options: [
          { id: 'A', text: '面对面深度交流，一次聊透', scores: { Fi: 2, Ni: 1 } },
          { id: 'B', text: '线上线下结合，灵活高效', scores: { Te: 2, Ne: 1 } },
          { id: 'C', text: '群体活动，热闹有氛围', scores: { Fe: 2, Se: 1 } },
          { id: 'D', text: '固定的小圈子，舒适熟悉', scores: { Si: 3 } }
        ]
      }
    ]
  }
}

export default function Debate() {
  const { topicId } = useParams()
  const navigate = useNavigate()

  const [currentTopicIndex, setCurrentTopicIndex] = useState(0)
  const [currentRound, setCurrentRound] = useState(0)
  const [history, setHistory] = useState<Round[]>([])
  const [scores, setScores] = useState<Record<string, number>>({})

  const allTopics = Object.keys(debates)
  const currentTopicId = topicId === 'all' ? allTopics[currentTopicIndex] : topicId
  const debate = debates[currentTopicId || '']

  if (!debate) return <div>辩题不存在</div>

  const round = debate.rounds[currentRound]

  const handleResponse = (optionId: string, optionScores: Record<string, number>) => {
    const option = round.options.find((o: any) => o.id === optionId)

    setHistory([...history, { speaker: 'ai', text: round.text }, { speaker: 'user', text: option.text }])

    const newScores = { ...scores }
    Object.entries(optionScores).forEach(([func, score]) => {
      newScores[func] = (newScores[func] || 0) + score
    })
    setScores(newScores)

    if (currentRound < debate.rounds.length - 1) {
      setCurrentRound(currentRound + 1)
    } else if (topicId === 'all' && currentTopicIndex < allTopics.length - 1) {
      // 进入下一个辩题
      setCurrentTopicIndex(currentTopicIndex + 1)
      setCurrentRound(0)
      setHistory([])
    } else {
      localStorage.setItem('mbti-scores', JSON.stringify(newScores))
      navigate('/result')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 via-orange-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{debate.title}</h2>
          <div className="text-sm text-gray-400">
            第 {currentRound + 1} 轮 / 共 {debate.rounds.length} 轮
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {history.map((msg, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg ${
                msg.speaker === 'ai'
                  ? 'bg-red-600/30 ml-12'
                  : 'bg-blue-600/30 mr-12'
              }`}
            >
              <div className="text-sm text-gray-300 mb-1">
                {msg.speaker === 'ai' ? '对方辩友' : '你'}
              </div>
              <div>{msg.text}</div>
            </div>
          ))}

          <div className="p-4 rounded-lg bg-red-600/30 ml-12">
            <div className="text-sm text-gray-300 mb-1">对方辩友</div>
            <div>{round.text}</div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">你的回应：</h3>
          <div className="space-y-3">
            {round.options.map((option: any) => (
              <button
                key={option.id}
                onClick={() => handleResponse(option.id, option.scores)}
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
