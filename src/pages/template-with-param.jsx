import { useParams } from "react-router";

export default function TemplateWithParamPage() {
    const { v } = useParams();


    return (
        <div className="flex-grow">
            The content after the template/ in the url shows here: {v}
        </div>
    );
}