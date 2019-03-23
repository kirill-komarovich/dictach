# frozen_string_literal: true

desc %(Run ESLint for the client application)
task :eslint, :environment do
  system('cd client && yarn lint')
end
