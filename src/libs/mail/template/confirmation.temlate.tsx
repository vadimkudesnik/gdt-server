/* eslint-disable prettier/prettier */
import * as React from "react"
import { Html } from "@react-email/html"
import { Body, Heading, Text, Link, Tailwind } from "@react-email/components"

interface ConfirmationTemlateProps {
	domain: string
	token: string
}

export function ConfirmationTemlate({ domain, token }: ConfirmationTemlateProps) {
	const confirmationLink = `${domain}/auth/new-verification&token=${token}`
    return (
        <Tailwind>
            <Html>
                    <Body className="text-black">
                        <Heading>Подтверждение почты</Heading>
                        <Text>
                            Чтобы подтвердить адрес электронной почты, пожалуйста, перейдите по ссылке:
                        </Text>
                        <Link href={confirmationLink}>Подтвердить почту</Link>
                        <Text>
                            Эта ссылка дейтсвительна в течение 1 часа. Если вы не запрашивали подтверждение, просто проигнорируйте данное сообщение.
                        </Text>
                    </Body>
                </Html>
        </Tailwind>
    )
}
