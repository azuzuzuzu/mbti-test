import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const mbtiTypes: Record<string, { dominant: string; auxiliary: string; tertiary: string; inferior: string }> = {
  'INTJ': { dominant: 'Ni', auxiliary: 'Te', tertiary: 'Fi', inferior: 'Se' },
  'INTP': { dominant: 'Ti', auxiliary: 'Ne', tertiary: 'Si', inferior: 'Fe' },
  'ENTJ': { dominant: 'Te', auxiliary: 'Ni', tertiary: 'Se', inferior: 'Fi' },
  'ENTP': { dominant: 'Ne', auxiliary: 'Ti', tertiary: 'Fe', inferior: 'Si' },
  'INFJ': { dominant: 'Ni', auxiliary: 'Fe', tertiary: 'Ti', inferior: 'Se' },
  'INFP': { dominant: 'Fi', auxiliary: 'Ne', tertiary: 'Si', inferior: 'Te' },
  'ENFJ': { dominant: 'Fe', auxiliary: 'Ni', tertiary: 'Se', inferior: 'Ti' },
  'ENFP': { dominant: 'Ne', auxiliary: 'Fi', tertiary: 'Te', inferior: 'Si' },
  'ISTJ': { dominant: 'Si', auxiliary: 'Te', tertiary: 'Fi', inferior: 'Ne' },
  'ISFJ': { dominant: 'Si', auxiliary: 'Fe', tertiary: 'Ti', inferior: 'Ne' },
  'ESTJ': { dominant: 'Te', auxiliary: 'Si', tertiary: 'Ne', inferior: 'Fi' },
  'ESFJ': { dominant: 'Fe', auxiliary: 'Si', tertiary: 'Ne', inferior: 'Ti' },
  'ISTP': { dominant: 'Ti', auxiliary: 'Se', tertiary: 'Ni', inferior: 'Fe' },
  'ISFP': { dominant: 'Fi', auxiliary: 'Se', tertiary: 'Ni', inferior: 'Te' },
  'ESTP': { dominant: 'Se', auxiliary: 'Ti', tertiary: 'Fe', inferior: 'Ni' },
  'ESFP': { dominant: 'Se', auxiliary: 'Fi', tertiary: 'Te', inferior: 'Ni' }
}

export default function Result() {
  const navigate = useNavigate()
  const [mbtiType, setMbtiType] = useState('')
  const [scores, setScores] = useState<Record<string, number>>({})

  useEffect(() => {
    const savedScores = localStorage.getItem('mbti-scores')
    if (!savedScores) {
      navigate('/')
      return
    }

    const parsedScores = JSON.parse(savedScores)
    setScores(parsedScores)

    // 计算 MBTI 类型
    const type = calculateMBTI(parsedScores)
    setMbtiType(type)
  }, [navigate])

  const calculateMBTI = (scores: Record<string, number>) => {
    // 找出得分最高的两个功能
    const allFunctions = Object.entries(scores).sort((a, b) => b[1] - a[1])
    if (allFunctions.length < 2) return 'INFP'

    const top1 = allFunctions[0][0]
    const top2 = allFunctions[1][0]

    // 根据最高的两个功能匹配类型
    for (const [type, functions] of Object.entries(mbtiTypes)) {
      const { dominant, auxiliary } = functions
      if (
        (dominant === top1 && auxiliary === top2) ||
        (dominant === top2 && auxiliary === top1)
      ) {
        return type
      }
    }

    // 如果没有精确匹配，使用备选逻辑
    const perceiving = ['Ne', 'Ni', 'Se', 'Si']
    const judging = ['Te', 'Ti', 'Fe', 'Fi']

    const topPerceiving = perceiving.reduce((a, b) =>
      (scores[a] || 0) > (scores[b] || 0) ? a : b
    )
    const topJudging = judging.reduce((a, b) =>
      (scores[a] || 0) > (scores[b] || 0) ? a : b
    )

    // 再次尝试匹配
    for (const [type, functions] of Object.entries(mbtiTypes)) {
      if (
        (functions.dominant === topPerceiving && functions.auxiliary === topJudging) ||
        (functions.dominant === topJudging && functions.auxiliary === topPerceiving)
      ) {
        return type
      }
    }

    return 'INFP'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">你的认知类型</h1>
          <div className="text-7xl font-bold text-purple-400 mb-6">{mbtiType}</div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">你的认知功能栈</h2>
          {mbtiType && mbtiTypes[mbtiType] && (
            <div className="mb-6 text-lg">
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-sm text-gray-400">主导功能</div>
                  <div className="text-2xl font-bold text-purple-400">{mbtiTypes[mbtiType].dominant}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400">辅助功能</div>
                  <div className="text-xl font-bold text-purple-300">{mbtiTypes[mbtiType].auxiliary}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400">第三功能</div>
                  <div className="text-lg text-gray-300">{mbtiTypes[mbtiType].tertiary}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400">劣势功能</div>
                  <div className="text-lg text-gray-400">{mbtiTypes[mbtiType].inferior}</div>
                </div>
              </div>
            </div>
          )}
          <h3 className="text-xl font-bold mb-4">你的得分</h3>
          <div className="grid grid-cols-2 gap-4">
            {['Ne', 'Ni', 'Se', 'Si', 'Te', 'Ti', 'Fe', 'Fi'].map((func) => {
              const score = scores[func] || 0
              const maxScore = Math.max(...Object.values(scores), 1)
              return (
                <div key={func} className="bg-white/5 p-4 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">{func}</span>
                    <span>{score}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${(score / maxScore) * 100}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            重新测试
          </button>
        </div>
      </div>
    </div>
  )
}
