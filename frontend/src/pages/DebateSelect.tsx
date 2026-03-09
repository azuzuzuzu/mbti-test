import { useNavigate } from 'react-router-dom'

export default function DebateSelect() {
  const navigate = useNavigate()

  const handleStart = () => {
    navigate('/debate/all')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 via-orange-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">辩论测试</h1>
          <p className="text-xl text-gray-300 mb-4">
            通过4场辩论展现你的真实思维方式
          </p>
          <p className="text-lg text-gray-400">
            每场辩论3-4轮，共约15分钟
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={handleStart}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition"
          >
            开始辩论
          </button>
        </div>
      </div>
    </div>
  )
}
