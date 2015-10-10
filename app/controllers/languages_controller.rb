class LanguagesController < ApplicationController


  def select
    if lang_params['lang'] == 'en'
      I18n.locale = 'en'
    elsif lang_params['lang'] == 'zh-CN'
      I18n.locale = 'zh-CN'
    end
    redirect_to home_path
  end

  private

  def lang_params
    params.permit(:lang)
  end
end
