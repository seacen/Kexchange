class ProblemsController < ApplicationController
  before_action :authenticate_user
  before_action :check_is_admin
  before_action :set_problem, only: [:show, :edit, :update, :destroy]
  before_action :check_valid, only: [:edit, :update, :show]

  def index
    @problems = curr_user.problems.order(created_at: :desc)
  end

  def new
    @problem = Problem.new

    @problem.ptype = params[:ptype] if defined?(params[:ptype])

    @problem.object = params[:object] if defined?(params[:object])

  end

  def create
    @problem = Problem.new(problem_params)
    @problem.user = curr_user
    respond_to do |format|
      if @problem.save
        format.html { redirect_to problems_path, notice: t('problem.new.success') }
        format.json { render :show, status: :created, location: @problem }
      else
        format.html { render :new, alert: @problem.errors }
        format.json { render json: @problem.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
  end

  def update
    @problem.attributes = problem_params
    @problem.user = curr_user
    changes = @problem.changes
    respond_to do |format|
      if @problem.save
        Klog.log('problem', 'update', changes, curr_user)
        format.html { redirect_to @problem, notice: t('problem.edit.success') }
        format.json { render :show, status: :ok, location: @problem }
      else
        format.html { render :edit }
        format.json { render json: @problem.errors, status: :unprocessable_entity }
      end
    end
  end

  def show
  end

  private

  def set_problem
    @problem = Problem.find(params[:id])
  end

  def problem_params
    params.require(:problem).permit(:title, :body, :user, :object, :ptype)
  end

  def check_valid
    return if @problem.user == curr_user

    redirect_to problems_path, alert: t('user.unauthorized')
  end
end
