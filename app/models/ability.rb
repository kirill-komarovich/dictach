# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new

    return if user.blank?

    can :manage, Namespace, user_id: user.id
    can :manage, Dictionary, namespace: { user_id: user.id }
  end
end
