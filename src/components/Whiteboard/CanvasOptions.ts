export interface ColorOption {
  value: string
  label: string
}

export interface SizeOption {
  value: string
  label: string
}

export interface CanvasOptionsInput {
  colors?: ColorOption[]
  sizes?: SizeOption[]
}

export class CanvasOptions {
  private colors: ColorOption[] = [
    { value: '#000000', label: '검정' },
    { value: '#FF0000', label: '빨강' },
    { value: '#00FF00', label: '초록' },
    { value: '#0000FF', label: '파랑' },
    { value: '#FFFF00', label: '노랑' },
    { value: '#FF00FF', label: '자홍' },
    { value: '#00FFFF', label: '청록' },
  ]

  private sizes: SizeOption[] = [
    { value: '2', label: '2px' },
    { value: '5', label: '5px' },
    { value: '10', label: '10px' },
    { value: '15', label: '15px' },
    { value: '20', label: '20px' },
  ]

  constructor(options?: CanvasOptionsInput) {
    if (options?.colors) {
      this.colors = options.colors
    }
    if (options?.sizes) {
      this.sizes = options.sizes
    }
  }

  getState(): { colors: ColorOption[]; sizes: SizeOption[] } {
    return {
      colors: this.colors,
      sizes: this.sizes,
    }
  }
}
