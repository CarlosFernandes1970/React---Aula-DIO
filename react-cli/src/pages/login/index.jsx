import { useNavigate  } from "react-router-dom";
import { MdEmail, MdLock } from 'react-icons/md'
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { api } from '../../services/api';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, Title, Column, TitleLogin, SubtitleLogin, EsqueciText, CriarText, Row, Wrapper } from './styles';

const schema = yup
  .object({
    email: yup.string().email('E-mail inválido!').required('Obrigatório informar um E-mail válido'),
    password: yup.string().min(3,'No mínimo 3 caracteres!').required('Obrigatório informar a senha.'),
  })
  .required()


const Login = () => {

    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
        resolver: yupResolver(schema)
    });

    const onSubmit = async (formData) => {
        try{
            const {data} = await api.get(`/users?email=${formData.email}&senha=${formData.password}`);
            
            if(data.length && data[0].id){
                navigate('/feed') 
                return
            }

            alert('Usuário ou senha inválidos!')
        }catch(e){
            alert("Erro detectado!")
        }
    };

    console.log('errors', errors);

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                 e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                <TitleLogin>Faça seu cadastro</TitleLogin>
                <SubtitleLogin>Faça seu login e make the change._</SubtitleLogin>

                <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    name="email"
                    errorMessage={errors?.email?.message}
                    control={control}
                    placeholder="E-mail"
                    leftIcon={<MdEmail />}
                />
                <Input
                    name="password"
                    errorMessage={errors?.password?.message}
                    control={control}
                    placeholder="Senha"
                    type="password"
                    leftIcon={<MdLock />}
                />
              <Button title="Entrar" variant="secondary" type="submit" />
            </form>
                <Row>
                    <EsqueciText>Esqueci minha senha</EsqueciText>
                    <CriarText>Criar Conta</CriarText>
                </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Login }