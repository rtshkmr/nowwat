class Api::TasksController < ApplicationController
    respond_to :json
  
    def index
      respond_with Task.order(deadline: :DESC)
    end
  
    def show
      respond_with Task.find(params[:id])
    end
  
    def create
      respond_with :api, Task.create(task_params)
    end
  
    def destroy
      respond_with Task.destroy(params[:id])
    end
  
    def update
      task = Task.find(params['id'])
      task.update(task_params)
      respond_with Task, json: task
    end
  
    private
  
    def task_params
      params.require(:task).permit(
        :id,
        :event_type,
        :event_date,
        :title,
        :speaker,
        :host,
        :published
      )
    end
  end