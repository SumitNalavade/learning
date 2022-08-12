package controller

import (
	"net/http"

	"example.com/todo_example/models"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

var todoArray = []models.Todo { }


func CreateNewTodo(ctx *gin.Context) {
	var newTodo models.Todo
	ctx.BindJSON(&newTodo)
	newTodo.ID = uuid.NewString()
	newTodo.Complete = false

	todoArray = append(todoArray, newTodo)

	ctx.JSON(http.StatusOK, gin.H{
		"todos" : todoArray,
	})
}

func GetTodos(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{
		"todos": todoArray,
	})
}

func UpdateTodo(ctx *gin.Context) {
	todoID := ctx.Param("id")

	var newTodo models.Todo
	ctx.BindJSON(&newTodo)

	for index, todo := range todoArray {
		if(todo.ID == todoID) {
			todoArray[index] = newTodo

			ctx.JSON(http.StatusOK, gin.H{
				"todos" : todoArray,
			})
			return
		}
	}

	ctx.JSON(http.StatusNotFound, "Todo not found")
}

func Deletetodo(ctx *gin.Context) {
	todoID := ctx.Param("id")

    for index, todo := range todoArray {
        if todo.ID == todoID {
			todoArray = append(todoArray[:index], todoArray[index+1:]...)
		}
    }

	ctx.JSON(http.StatusOK, gin.H{
		"todos" : todoArray,
	})
}
