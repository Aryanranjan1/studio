
import { Metadata } from 'next';
import { ContactForm } from './form';

export const metadata: Metadata = {
    title: 'Contact',
    description: "Have an idea? Let's turn it into a reality. Fill out the form, and we'll be in touch to discuss your project in detail.",
};

export default function ContactPage() {
    return <ContactForm />;
}
