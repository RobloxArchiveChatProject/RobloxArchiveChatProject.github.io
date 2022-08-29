import Header from "../../sections/header";

export function SectionTitle({ branch }: { branch: string }) {
    return <Header branch={branch}></Header>
}

export function Text({ text }: { text: string }) {
    return <p>{text}</p>
}