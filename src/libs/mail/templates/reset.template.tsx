/* eslint-disable prettier/prettier */
import * as React from "react"
import { Html } from "@react-email/html"
import { Body, Heading, Text, Link, Tailwind } from "@react-email/components"


interface ResetPasswordTemplateProps {
    domain: string
	token: string
}

export function ResetPasswordTemplate({
	domain,
	token
}: ResetPasswordTemplateProps) {
    const resetLink = `${domain}/auth/new-password?token=${token}`
    return (
        <Tailwind>
            <Html>
                    <Body className="text-black">
                        <Heading>Сброс пароля</Heading>
                        <Text>
                            Вы запросили сброс пароля. Пожалуйста перейдите по ссылке, что бы создать новый пароль:
                        </Text>
                        <Link href={resetLink}>Подтвердить сброс пароля</Link>
                        <Text>
                            Эта ссылка дейтсвительна в течение 1 часа. Если вы не запрашивали сброс пароля, просто проигнорируйте данное сообщение.
                        </Text>
                    </Body>
                </Html>
        </Tailwind>
    )
}
