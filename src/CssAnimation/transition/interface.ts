export enum TransitionLabel {
  transitionDuration = 'transition-duration',
  transitionProperty = 'transition-property',
  transitionTimingFunction = 'transition-timing-function',
  transitionDelay = 'transition-delay'
}

export type TransitionConfig = {
  [key in TransitionLabel]: string
}