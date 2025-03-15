import { useState} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function MainPageForm() {

    const submitForm = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const payload = Object.fromEntries(formData)

        console.log({name, dream})
    }


    return (
        <>
            <h2>Build Your Dream</h2>
            <form onSubmit={submitForm}>
                <Form.Group className = "mb-3">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control type="text" name="firstName" placeholder="Enter your name" />
                </Form.Group>

                <Form.Group className = "mb-3">
                    <Form.Label>Your Dream</Form.Label>
                    <Form.Control type="text" name="dream" placeholder="Enter the dream you want to build" />
                </Form.Group>
            </form>
        </>
    )
}