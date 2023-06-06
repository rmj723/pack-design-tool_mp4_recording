import s from './Flicker.module.scss'
export default function Flicker({ color = '#000' }: { color?: string }) {
  return (
    <div
      style={{ backgroundColor: color }}
      className={`${s.flicker} absolute top-0 left-0 w-full h-screen pointer-events-none flicker`}></div>
  )
}
