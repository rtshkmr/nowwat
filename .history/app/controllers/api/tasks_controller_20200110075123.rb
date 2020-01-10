class Api::TasksController < ApplicationController
    respond_to :json
  
    def index
      respond_with Task.order(deadline: :DESC)
    end
  
    def show
      respond_with Task.find(params[:id])
    end
  
    def create
      respond_with :api, Task.create(event_params)
    end
  
    def destroy
      respond_with Task.destroy(params[:id])
    end
  
    def update
      event = Task.find(params['id'])
      event.update(event_params)
      respond_with Event, json: event
    end
  
    private
  
    def event_params
      params.require(:event).permit(
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