class Api::V1::AttemptsController < ApplicationController
  before_action :set_attempt, only: [:show,:update,:destroy]

  def index
    attempts = Attempt.all
    render json: attempts, status: 200
  end

  def create
    attempt = Attempt.create(attempt_params)
    render json: attempt, status: 201
  end

  def update
    @attempt.update(attempt_params)
    render json: @attempt, status: 200
  end

  def destroy
    attemptId = @attempt.id
    @attempt.destroy
    render json: {message:"Deleted", attemptId:attemptId}
  end

  def show
    render json: @attempt, status: 200
  end

  private
  def attempt_params
    params.permit(:success, :tries, :user_id, :word_id)
  end

  def set_attempt
    @attempt = Attempt.find(params[:id])
  end
end
