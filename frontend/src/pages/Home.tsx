import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 via-orange-900 to-black text-white flex items-center justify-center">
      <div className="text-center max-w-2xl px-6">
        <h1 className="text-5xl font-bold mb-6">认知辩论</h1>
        <p className="text-xl mb-4 text-gray-300">
          通过辩论，展现你真实的思维方式
        </p>
        <p className="text-lg mb-8 text-gray-400">
          在思维的交锋中，发现真实的自己
        </p>

        <button
          onClick={() => navigate('/debate-select')}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition"
        >
          开始辩论测试
        </button>
      </div>
    </div>
  )
}
