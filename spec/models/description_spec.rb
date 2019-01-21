# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Description, type: :model do
  subject { build(:description) }

  it { is_expected.to be_valid }

  describe 'associations' do
    it { is_expected.to belong_to(:word) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:body) }
  end
end
