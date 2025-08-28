import avatar from '../assets/images.jpeg';


export default function ProfileCard() {
    const user = {
        name: "Aruzhan N.",
        email: "aruzhan@example.com",
        about: "Frontend студент. Люблю React и вкусный плов."
    };

    return (
        <section className="card">
            <img className="avatar" src={avatar} alt="avatar" />
            <div className="card-body">
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <p>{user.about}</p>
            </div>
        </section>
    );
}