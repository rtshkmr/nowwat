# frozen_string_literal: true

class Api::TagsController < ApplicationController
  respond_to :json
  def index
    respond_with Tag.order(created_at: :DESC), include: :tasks
  end

  def show
    respond_with Tag.find(params[:id]), include: :tasks
    end
end
