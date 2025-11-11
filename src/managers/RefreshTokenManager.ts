import { OneTimeObservable } from '@utils/observables/OneTimeObservable'

class RefreshTokenManager extends OneTimeObservable<{ token?: string }> {
  private isRefreshing = false

  async refresh(getTokenFn: () => Promise<{ token?: string }>) {
    if (this.isRefreshing) {
      return new Promise<{ token?: string }>((resolve) => {
        this.subscribe((data) => resolve(data))
      })
    }

    this.isRefreshing = true

    try {
      const result = await getTokenFn()
      this.notify(result)
      return result
    } finally {
      this.isRefreshing = false
    }
  }
}

export const refreshTokenManager = new RefreshTokenManager()
