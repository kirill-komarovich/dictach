class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::Whitelist

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  def jwt_payload
    {
      'id' => id,
      'email' => email
    }
  end

end
