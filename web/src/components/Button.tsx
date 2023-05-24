
interface ButtonProps {
  title: string
}

export function Button(props: ButtonProps){
  return (
    <div >
      {props.title}
    </div>
  )
}