package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"example.com/todo_example/controller"
)

func ErrorHandler(c *gin.Context) {
	c.Next()

	c.JSON(http.StatusInternalServerError, "Unexpected Error")
}

func main() {

	router := gin.New()

	router.GET("/todos", controller.GetTodos)
	router.POST("/todos", controller.CreateNewTodo)
	router.PATCH("/todos/:id", controller.UpdateTodo)
	router.DELETE("/todos/:id", controller.Deletetodo)

	router.Use(ErrorHandler)

	router.Run()
}