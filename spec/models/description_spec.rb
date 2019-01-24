# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Description, type: :model do
  subject { build(:description) }

  it { is_expected.to be_valid }

  describe 'associations' do
    it { is_expected.to belong_to(:word) }
    it { is_expected.to delegate_method(:language).to(:word) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:body) }

    describe 'part of speech validation' do
      context 'when language does not contain part of speech' do
        it 'does not valid' do
          subject.part_of_speech = 'invalid_part_of_speech'
          is_expected.not_to be_valid
        end
      end
    end
  end
end
