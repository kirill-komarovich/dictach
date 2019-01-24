# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  subject { build(:user) }

  it { is_expected.to be_valid }

  it 'include nessecary devise modules' do
    expected_devise_modules = %i[
      database_authenticatable registerable
      recoverable validatable trackable
    ]
    expect(subject.devise_modules).to include(*expected_devise_modules)
  end

  describe 'associations' do
    it { is_expected.to have_many(:namespaces).dependent(:destroy) }
    it { is_expected.to have_many(:dictionaries).through(:namespaces) }
  end
end
