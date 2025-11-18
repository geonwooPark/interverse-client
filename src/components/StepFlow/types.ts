export interface StepFlowProps {
  activeStep: number
  onNext: () => void
  onPrev: () => void
}

export type StepProps = Partial<Omit<StepFlowProps, 'activeStep'>>
