import { Label } from "flowbite-react"


interface CustomLabelProps {
    required?: boolean
    htmlFor: string
    value: string
}

export const CustomLabel:React.FC<CustomLabelProps> = ({ required, htmlFor, value }) => {

    return (
        <>
            <Label htmlFor={htmlFor} value={value} />
            { required ? <Label htmlFor={htmlFor} value="*" color="failure" />: <></> }
        </>
    )

} 