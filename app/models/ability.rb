# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new

    return if user.blank?

    can :manage, Tag, user_id: user.id
    can :manage, Dictionary, user_id: user.id
    can :manage, Word, dictionary: { user_id: user.id }
  end
end
