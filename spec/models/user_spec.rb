# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  subject { build(:user) }

  it { is_expected.to be_valid }

  it 'include nessecary devise modules' do
    expected_devise_modules = %i[
      doorkeeper database_authenticatable registerable
      recoverable validatable trackable
    ]
    expect(subject.devise_modules).to include(*expected_devise_modules)
  end
end
