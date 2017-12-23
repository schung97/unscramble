class User < ApplicationRecord
  has_many :attempts
  has_many :words, through: :attempts
end
