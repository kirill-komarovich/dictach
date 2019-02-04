# frozen_string_literal: true

require 'rails_helper'
require 'cancan/matchers'

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

  describe 'abilities' do
    subject(:ability) { Ability.new(user) }
    let(:user) { nil }

    context 'when is signed in' do
      let(:user) { create(:user) }
      let(:namespace) { create(:namespace, user: user) }
      let(:dictionary) { create(:dictionary, namespace: namespace) }

      it 'can manage all owned resources', :aggregate_failures do
        is_expected.to be_able_to(:manage, namespace)
        is_expected.to be_able_to(:manage, dictionary)
      end
    end
  end
end
