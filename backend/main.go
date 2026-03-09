package main

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
)

func main() {
	r := gin.Default()

	// CORS 配置
	r.Use(cors.Default())

	// 路由
	r.GET("/api/story", getStory)
	r.POST("/api/answer", submitAnswer)
	r.POST("/api/result", calculateResult)

	r.Run(":8080")
}

func getStory(c *gin.Context) {
	// 返回故事内容
	c.JSON(200, gin.H{
		"chapter": 1,
		"title": "迷雾森林",
		"content": "你醒来，发现自己在一个陌生的地方...",
	})
}

func submitAnswer(c *gin.Context) {
	// 接收用户答案
	c.JSON(200, gin.H{"status": "ok"})
}

func calculateResult(c *gin.Context) {
	// 计算 MBTI 结果
	c.JSON(200, gin.H{
		"type": "INTJ",
		"functions": map[string]int{
			"Ni": 85,
			"Te": 75,
		},
	})
}
