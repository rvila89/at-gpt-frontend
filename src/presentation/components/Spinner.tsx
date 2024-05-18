import PulseLoader from 'react-spinners/PulseLoader'

interface SpinnerProps {
  slow?: boolean
}

const Spinner = ({ slow }: SpinnerProps) => {
  return (
    <div style={{ margin: 'auto', display: 'block', textAlign: 'center' }}>
      <PulseLoader color='#de1d70' size={25} />
      {slow && <p>Este proceso puede tardar un poco...</p>}
    </div>
  )
}

export default Spinner
