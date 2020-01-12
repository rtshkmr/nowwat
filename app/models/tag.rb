# frozen_string_literal: true

class Tag < ApplicationRecord
  has_many :taggings
  has_many :tasks, through: :taggings

  accepts_nested_attributes_for :tasks 
end
