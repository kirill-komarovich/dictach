# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Word, type: :model do
  subject { build(:word) }

  it { is_expected.to be_valid }

  describe 'associations' do
    it { is_expected.to belong_to(:dictionary) }
    it { is_expected.to have_many(:descriptions).dependent(:destroy) }
    it { is_expected.to delegate_method(:language).to(:dictionary) }
    it { is_expected.to accept_nested_attributes_for(:descriptions) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_length_of(:title).is_at_most(255) }
    it { is_expected.to validate_uniqueness_of(:title).scoped_to(:dictionary_id) }
    it { is_expected.to allow_value('without_spacing').for(:title) }
    it { is_expected.not_to allow_value('with spacing').for(:title) }
  end

  describe 'scopes' do
    describe '.starts_with' do
      let(:letter) { 'a' }
      let!(:expected_word) { create(:word, title: "#{letter}_word") }
      let(:unexpected_word) { create(:word, title: 'unexpected_word') }

      it 'returns words that starts with requested letter' do
        expect(described_class.starts_with(letter)).to eq [expected_word]
      end
    end
  end
end
