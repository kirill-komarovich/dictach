# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Word, type: :model do
  subject { build(:word) }

  it { is_expected.to be_valid }

  describe 'associations' do
    it { is_expected.to belong_to(:dictionary) }
    it { is_expected.to have_many(:descriptions).dependent(:destroy) }
    it { is_expected.to delegate_method(:language).to(:dictionary) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_length_of(:title).is_at_least(3).is_at_most(255) }
    it { is_expected.to validate_uniqueness_of(:title).scoped_to(:dictionary_id) }
  end

  describe 'scopes' do
    describe '.starts_with' do
      it 'returns words that starts with requested letter' do
        expect(true).to be false
      end
    end
  end
end
