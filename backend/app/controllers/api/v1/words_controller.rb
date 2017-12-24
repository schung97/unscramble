class Api::V1::WordsController < ApplicationController
  before_action :set_word, only: [:show]

  def index
    words = Word.all
    render json: words, status: 200
  end

  def show
    render json: @word, status: 200
  end

  private
  def set_word
    @word = Word.find(params[:id])
  end
end
