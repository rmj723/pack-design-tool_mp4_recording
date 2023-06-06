import s from './PuckInfo.module.scss'
export default function PuckInfo({}) {
  return (
    <div className='absolute top-0 right-0 flex items-center justify-center w-1/2 h-2/3'>
      <div className='w-1/2'>
        <h2 className={`${s.underline} mb-4 text-22-lateral`}>Description</h2>
        <p className='mb-4 text-16'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>
        <h2 className={`${s.underline} mb-4 text-22-lateral`}>Badges</h2>
        <div className=''></div>
      </div>
    </div>
  )
}
