# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :validatable, :trackable

  has_many :tags, dependent: :destroy
  has_many :dictionaries, dependent: :destroy
end
