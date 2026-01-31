import { Ref } from 'react'

interface WalletConnectorProps {
  ref: Ref<HTMLDivElement> | null
}

export const WalletConnector = ({ ref }: WalletConnectorProps) => {
  return (
    <div ref={ref} className=''>
      <w3m-button balance='hide' loadingLabel='Connecting...' size='sm' label='→' />
    </div>
  )
}
